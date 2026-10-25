// Offline segmentation creates alpha only; sharp retains the original photograph's RGB pixels.
// This tool is an asset-processing dependency outside the shipped application.
import fs from 'node:fs/promises';
import sharp from 'sharp';
import {segmentForeground} from '/tmp/mahfouz-media-tools/node_modules/@imgly/background-removal-node/dist/index.mjs';
const subjects=[
 {n:'02',crop:{left:225,top:175,width:565,height:1105},output:'public/assets/hero/coach-transparent.webp'},
 {n:'04',crop:{left:35,top:320,width:650,height:1216},output:'public/assets/coach/coach-nutrition-transparent.webp'},
 {n:'01',crop:{left:155,top:345,width:470,height:850},output:'public/assets/coach/coach-about-transparent.webp'},
];
for(const subject of subjects){
 const pixels=await sharp(`private/originals/source-${subject.n}-coach.png`).extract(subject.crop).png().toBuffer();
 const mask=await segmentForeground(new Blob([pixels],{type:'image/png'}),{publicPath:'file:///tmp/mahfouz-media-tools/node_modules/@imgly/background-removal-node/dist/',model:'medium',output:{format:'image/png',type:'mask'}});
 const alpha=Buffer.from(await mask.arrayBuffer());
 await fs.writeFile(`private/coach-${subject.n}-alpha.png`,alpha);
 // segmentForeground returns a grayscale alpha mask, not synthesized foreground content.
 const metadata=await sharp(alpha).metadata(); console.log(subject.n,metadata);
 const gray=await sharp(alpha).extractChannel('alpha').raw().toBuffer();
 // Clear only known background remnants; retain the classifier's subject boundary.
 const clear=(x,y,w,h)=>{for(let row=y;row<Math.min(y+h,subject.crop.height);row++)gray.fill(0,row*subject.crop.width+x,row*subject.crop.width+Math.min(x+w,subject.crop.width));};
 if(subject.n==='02'){clear(290,0,70,55);clear(385,800,180,305);clear(525,765,40,340);clear(0,850,55,180);}
 if(subject.n==='04'){clear(610,565,40,100);clear(0,1070,150,146);clear(223,1050,70,166);clear(315,1018,28,198);}
 if(subject.n==='01'){clear(170,0,65,135);clear(330,0,100,24);}
 if(subject.n==='02'){
  const hole=Buffer.from('<svg width="565" height="1105"><path d="M385 478 C401 493 420 509 429 524 L420 554 L416 583 L410 610 L397 631 L365 653 L359 650 L368 609 L371 578 L368 548 L379 510 Z" fill="white"/></svg>');
  const holePixels=await sharp(hole).extractChannel('alpha').raw().toBuffer();
  for(let i=0;i<gray.length;i++)if(holePixels[i]>0)gray[i]=Math.round(gray[i]*(1-holePixels[i]/255));
 }

 const rgb=await sharp(pixels).removeAlpha().raw().toBuffer();
 const raw=Buffer.alloc(subject.crop.width*subject.crop.height*4);
 for(let i=0;i<gray.length;i++){raw[4*i]=rgb[3*i];raw[4*i+1]=rgb[3*i+1];raw[4*i+2]=rgb[3*i+2];raw[4*i+3]=gray[i]<30?0:gray[i]>230?255:Math.round((gray[i]-30)*255/200);}
 await sharp(raw,{raw:{width:subject.crop.width,height:subject.crop.height,channels:4}}).trim({threshold:8}).webp({lossless:true,alphaQuality:100}).toFile(subject.output);
 console.log(subject.output,await sharp(subject.output).metadata());
}
