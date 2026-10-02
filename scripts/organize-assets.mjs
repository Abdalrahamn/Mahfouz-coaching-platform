// Deterministic privacy processing: remove source pixels, never rely on CSS masking.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let sharp;
try { sharp = require('sharp'); } catch { sharp = require('/tmp/mahfouz-media-tools/node_modules/sharp'); }
const ids = ['6600b582-2d3f-42ca-8804-9644cc51c56e','bbd5adf2-35fa-4cee-8e29-e9383081614a','f88655c8-e1d7-41d5-85a9-26aea6d2dedc','fe40b477-d6e5-4e6c-88ab-c13e742895fb','6a081a35-3006-4808-9406-26d4e176e92c','063a2a56-d8c7-41a5-a57d-72b7fbe90cce','c8e67866-23d3-4c0e-ab3b-c2554e60bc50','12f3d193-4acb-47aa-8948-ec802c275d32','ae522110-7b1a-418e-a285-66ece0be5c2b','3c96b84b-bb6e-4f01-b68d-51d0e9d4121a','34fe4ba5-93c7-4669-8553-3d8b49a3f196','ced0780c-4a3b-46b2-aabd-c844a0939807','3034bde5-d45c-4275-86cd-f4101c0b3cf5','f40a41ea-c632-4b59-8869-c4241e9474d3','c1f8b0d2-2b41-4167-8b43-a468d6632f16','458d598d-42c2-4c8b-843f-9b482f1eb60d','34aabcbc-9e0b-49a5-9a45-2ae4b9dd987b','d1f21276-a7e9-4fc8-9ce6-4288f45bba7b','d207c190-880a-406a-b9b9-06d2add1d1c1','d7b35224-da08-45d8-ba1b-ce2772eaf122','7a94fb2c-8aab-47e0-ae54-532fcb5fd869','5a9986a0-1341-439d-8d58-957757a177ac'];
const categories = ids.map((_,i)=>i<9?'coach':i===9?'visual-reference':i<13?'transformation':i<20?'testimonial':'certificate');
const rows=[];
for(let i=0;i<ids.length;i++){
 const source=`/tmp/codex-clipboard-${ids[i]}.png`;
 const n=String(i+1).padStart(2,'0');
 const original=`private/originals/source-${n}-${categories[i]}.png`;
 await fs.copyFile(source,original);
 const {width,height}=await sharp(source).metadata();
 let output, processing='Metadata stripped; optimized WebP working copy.';
 if(i<9){
  output=i===1?'public/assets/hero/coach-training.webp':`public/assets/coach/coach-${String(i+1).padStart(2,'0')}.webp`;
  await sharp(source).resize({width:1152,withoutEnlargement:true}).webp({quality:86}).toFile(output);
 }else if(i===9){
  output='private/references/hero-direction.png';await fs.mkdir(path.dirname(output),{recursive:true});await fs.copyFile(source,output);
  processing='Flattened text/UI: reference only; never served as website media.';
 }else if(i<13){
  output=`public/assets/transformations/transformation-${String(i-9).padStart(2,'0')}.webp`;
  // Preserve the source comparison and bodies. Add opaque face masks where source stickers were incomplete.
  const masks=i===10?[[465,594,160,132]]:i===12?[[150,560,128,116],[430,553,142,120]]:[];
  let pipe=sharp(source);
  if(masks.length)pipe=pipe.composite([{input:Buffer.from(`<svg width="${width}" height="${height}">${masks.map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#15191e"/>`).join('')}</svg>`)}]);
  await pipe.webp({quality:90}).toFile(output);
  processing='Original comparison proportions retained, no body retouching; opaque client face masks on 01 and 03.';
 }else if(i<20){
  output=`public/assets/testimonials/feedback-${String(i-12).padStart(2,'0')}-redacted.webp`;
  const crops=[{left:0,top:250,width:710,height:1140},{left:0,top:150,width:710,height:1160},{left:45,top:335,width:1130,height:1765},{left:30,top:875,width:950,height:255},{left:45,top:1440,width:1140,height:730},{left:0,top:168,width:710,height:1190},{left:35,top:1515,width:1090,height:450}];
  let pixels=await sharp(source).extract(crops[i-13]).png().toBuffer();
  if(i===16){
   pixels=await sharp(pixels).composite([{input:Buffer.from('<svg width="950" height="255"><rect x="635" y="30" width="175" height="105" fill="#232624"/></svg>')}]).png().toBuffer();
  }
  await sharp(pixels).webp({quality:94}).toFile(output);
  processing='Permanent pixel crop removes contact header, profile photo and contact UI. Selected anonymous message area only.';
  if(i===16)processing+=' Opaque pixels additionally remove the referral name inside the message; surrounding identifying conversation excluded.';
  if(i===17)processing+=' Names and identifying family/work/wedding references excluded.';
  if(i===19)processing+=' Only anonymous progress messages retained; health context excluded.';
 }else{
  output=i===20?'public/assets/certificates/certificate-iasst.webp':'public/assets/certificates/certificate-fitxpert.webp';
  await sharp(source).webp({quality:93}).toFile(output);
 }
 const m=await sharp(output).metadata();
 rows.push({attachment:i+1,category:categories[i],source,privateOriginal:original,workingCopy:output,width:m.width,height:m.height,processing});
}
await fs.writeFile('private/asset-manifest.json',JSON.stringify(rows,null,2));
await fs.writeFile('ASSET_INVENTORY.md',`# Asset inventory\n\nAll 22 supplied images inspected. All originals preserved under ignored, non-public \`private/originals/\`. No MP4 is used or represented as a testimonial.\n\n| Attachment | Classification | Working copy | Processing |\n|---|---|---|---|\n${rows.map(r=>`| ${r.attachment} | ${r.category} | \`${r.workingCopy}\` | ${r.processing} |`).join('\n')}\n\n## Privacy\nSeven feedback derivatives are irreversibly cropped/flattened and metadata stripped. Full originals, reference and source contact sheet must never be deployed. No client name is used in filenames, alt text, captions or copy. Crops are excerpts of real feedback, not fabricated testimonials. Transformation masks cover client faces; bodies are unchanged.\n`);
console.log('Organized 22 assets: 9 coach, 3 transformations, 7 redacted feedback, 2 certificates, 1 private reference.');
