const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

// Match all records: <div id="rec..." ...>
const recRegex = /<div id="(rec\d+)"[^>]*>([\s\S]*?)(?=<div id="rec\d+"|$)/g;
let match;
const records = [];

while ((match = recRegex.exec(html)) !== null) {
  const id = match[1];
  const content = match[2];
  
  // Extract all text inside
  const textMatches = content.match(/<div class='tn-atom'[^>]*>([\s\S]*?)<\/div>/g) || [];
  const cleanTexts = textMatches.map(t => t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
  
  // Extract images
  const imgs = content.match(/https?:\/\/[^\s"'()><]+\.(?:png|jpg|jpeg|webp|svg)/gi) || [];
  
  records.push({
    id,
    cleanTexts,
    images: [...new Set(imgs)]
  });
}

console.log(JSON.stringify(records, null, 2));
