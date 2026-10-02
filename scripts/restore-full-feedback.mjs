// Full supplied screenshots. Only identifying pixels are irreversibly replaced.
import sharp from 'sharp';
import fs from 'node:fs/promises';
const identityMasks = [
 // Names and profile images in the contact header.
 {n:14,rects:[[132,78,390,68]]},
 // Profile image also occurs beside the voice-note waveform; audio UI remains intact.
 {n:15,rects:[[130,78,400,70],[455,1315,96,80]]},
 {n:16,rects:[[238,17,590,125]]},
 // Contact photo, sender's name/university identifier, referral name and named story caption.
 {n:17,rects:[[228,0,600,60],[596,727,165,80],[85,727,270,80],[630,905,165,80],[150,1715,155,68]]},
 // Contact identity and the one named friend in the message. Conversation preserved.
 {n:18,rects:[[226,0,655,82],[558,1158,160,70]]},
 {n:19,rects:[[136,102,436,53],[132,72,88,88]]},
 {n:20,rects:[[225,112,650,154]]},
];
for(const {n,rects} of identityMasks){
 const source=`private/originals/source-${n}-testimonial.png`;
 const {width,height}=await sharp(source).metadata();
 const overlay=Buffer.from(`<svg width="${width}" height="${height}">${rects.map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#232624"/>`).join('')}</svg>`);
 await sharp(source).composite([{input:overlay}]).webp({lossless:true}).toFile(`public/assets/testimonials/feedback-0${n-13}-full-redacted.webp`);
 console.log(n,width,height);
}
await fs.writeFile('private/full-feedback-processing.json',JSON.stringify(identityMasks,null,2));
