const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

const match = html.match(/<div id="rec2049114373"[\s\S]*?(?=<div id="rec\d+)/);
if (match) {
  const block = match[0];
  const imgElems = block.match(/<div class='t396__elem[^>]+data-elem-type='image'[^>]*>[\s\S]*?<\/div>\s*<\/div>/g) || [];
  imgElems.forEach((el, i) => {
    const srcMatch = el.match(/data-original='([^']+)'/);
    const top320 = el.match(/data-field-top-res-320-value="([^"]+)"/);
    const left320 = el.match(/data-field-left-res-320-value="([^"]+)"/);
    const w320 = el.match(/data-field-width-res-320-value="([^"]+)"/);
    const h320 = el.match(/data-field-height-res-320-value="([^"]+)"/);
    const top = el.match(/data-field-top-value="([^"]+)"/);
    const left = el.match(/data-field-left-value="([^"]+)"/);
    const w = el.match(/data-field-width-value="([^"]+)"/);
    const h = el.match(/data-field-height-value="([^"]+)"/);
    console.log(`Flower ${i} (${srcMatch ? srcMatch[1].split('/').pop() : ''}):`);
    console.log(`  desktop: top=${top?top[1]:''}, left=${left?left[1]:''}, w=${w?w[1]:''}, h=${h?h[1]:''}`);
    console.log(`  mobile320: top=${top320?top320[1]:''}, left=${left320?left320[1]:''}, w=${w320?w320[1]:''}, h=${h320?h320[1]:''}`);
  });
}
