const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

const match = html.match(/<div id="rec2049114373"[\s\S]*?(?=<div id="rec\d+)/);
if (match) {
  const block = match[0];
  // Find all elements with data-elem-type="image"
  const imgElems = block.match(/<div class='t396__elem[^>]+data-elem-type='image'[^>]*>[\s\S]*?<\/div>\s*<\/div>/g) || [];
  console.log(`Found ${imgElems.length} image elements in rec2049114373:`);
  imgElems.forEach((el, i) => {
    const srcMatch = el.match(/data-original='([^']+)'/);
    const topMatch = el.match(/data-field-top-value="([^"]+)"/);
    const leftMatch = el.match(/data-field-left-value="([^"]+)"/);
    const widthMatch = el.match(/data-field-width-value="([^"]+)"/);
    const heightMatch = el.match(/data-field-height-value="([^"]+)"/);
    console.log(`Image ${i}: src=${srcMatch ? srcMatch[1] : ''}, top=${topMatch ? topMatch[1] : ''}, left=${leftMatch ? leftMatch[1] : ''}, w=${widthMatch ? widthMatch[1] : ''}, h=${heightMatch ? heightMatch[1] : ''}`);
  });
}
