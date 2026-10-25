// Deterministic edits explicitly requested by the owner: masks, privacy crops, web encoding.
// The hero retains source RGB pixels. No generated face, body or occluded anatomy is used.
import sharp from 'sharp';
import fs from 'node:fs/promises';
const original = n => `private/originals/source-${String(n).padStart(2,'0')}-${n < 10 ? 'coach' : n < 14 ? 'transformation' : 'testimonial'}.png`;
const outline = '369,215 407,204 456,213 487,236 511,270 522,299 515,335 520,365 541,397 584,423 624,450 653,480 676,523 692,567 710,608 733,658 742,703 734,750 710,794 699,827 726,872 725,906 697,924 643,936 591,923 563,895 548,929 553,998 547,1101 534,1167 517,1239 512,1280 294,1280 283,1226 276,1160 277,1065 273,998 271,934 277,874 287,827 286,784 276,750 262,721 249,710 251,670 270,618 283,574 300,526 321,471 348,435 380,407 390,386 375,363 359,338 347,306 350,274 358,241';
const mask = Buffer.from(`<svg width="960" height="1280"><polygon points="${outline}" fill="white"/></svg>`);
const rgba = await sharp(original(2)).ensureAlpha().composite([{input:mask,blend:'dest-in'}]).png().toBuffer();
await fs.writeFile('private/coach-source-mask.png',rgba);
await sharp(rgba).trim().webp({quality:94,alphaQuality:100}).toFile('public/assets/hero/coach-isolated.webp');
// Transformations preserve the supplied poster pixels including its original lettering/stickers.
for(let n=11;n<=13;n++) await sharp(original(n)).webp({lossless:true}).toFile(`public/assets/transformations/transformation-0${n-10}.webp`);
const treatments = [
 {n:14,crop:{left:0,top:250,width:710,height:1140},rects:[],reason:'Broader anonymous chat; identifying header and composer removed.'},
 {n:15,crop:{left:0,top:150,width:710,height:1160},rects:[],reason:'Full feedback bubble and question retained; contact header and voice-note profile removed.'},
 {n:16,crop:{left:45,top:335,width:1130,height:1765},rects:[],reason:'Long feedback retained with its natural proportions; header removed.'},
 {n:17,crop:{left:0,top:875,width:1242,height:575},rects:[[620,25,240,105]],reason:'Referral feedback and nutrition/training requests retained. Referral name permanently covered; university/name introduction excluded.'},
 {n:18,crop:{left:45,top:220,width:1140,height:1950},rects:[[0,225,930,85],[0,900,930,310],[0,1265,930,85],[0,1740,930,150]],reason:'Long feedback retained. Names, family/work referrals and wedding context permanently covered; identifying header excluded.'},
 {n:19,crop:{left:0,top:168,width:710,height:1190},rects:[],reason:'Weight photo and chat context retained; header and composer removed.'},
 {n:20,crop:{left:35,top:360,width:1170,height:2030},rects:[],reason:'Broader anonymous conversation and milestones retained; header, profile, date and composer excluded.'},
];
const dimensions=[];
for(const {n,crop,rects} of treatments){
 let pixels=await sharp(original(n)).extract(crop).png().toBuffer();
 if(rects.length)pixels=await sharp(pixels).composite([{input:Buffer.from(`<svg width="${crop.width}" height="${crop.height}">${rects.map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#232624"/>`).join('')}</svg>`)}]).png().toBuffer();
 await sharp(pixels).webp({lossless:true}).toFile(`public/assets/testimonials/feedback-0${n-13}-redacted.webp`);
 dimensions.push([crop.width,crop.height]);
}
console.log(JSON.stringify({hero:await sharp('public/assets/hero/coach-isolated.webp').metadata(),feedback:dimensions}));
await fs.writeFile('private/refinement-processing.json',JSON.stringify({hero:'Original-pixel manual alpha mask. Generated candidate excluded because it reconstructed occluded anatomy.',treatments},null,2));
