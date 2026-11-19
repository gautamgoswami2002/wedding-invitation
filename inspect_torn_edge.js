const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

const match = html.match(/<div id="rec2002274581"[\s\S]*?(?=<div id="rec\d+)/);
if (match) {
  const content = match[0];
  const elems = content.match(/<div class='t396__elem[^>]+>[\s\S]*?<\/div>\s*<\/div>/g) || [];
  elems.forEach((el, i) => {
    const id = el.match(/data-elem-id="([^"]+)"/);
    const top = el.match(/data-field-top-value="([^"]+)"/);
    const left = el.match(/data-field-left-value="([^"]+)"/);
    const w = el.match(/data-field-width-value="([^"]+)"/);
    const h = el.match(/data-field-height-value="([^"]+)"/);
    const trans = content.match(new RegExp(`data-elem-id="${id ? id[1] : ''}"[\\s\\S]*?transform:([^;]+);`));
    console.log(`Elem ${i}: id=${id ? id[1] : ''}, top=${top ? top[1] : ''}, left=${left ? left[1] : ''}, w=${w ? w[1] : ''}, transform=${trans ? trans[1] : 'none'}`);
  });
}
