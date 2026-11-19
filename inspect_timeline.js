const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

const match = html.match(/<div id="rec2002506421"[\s\S]*?(?=<div id="rec\d+)/);
if (match) {
  const content = match[0];
  console.log('--- rec2002506421 timeline elements ---');
  const elems = content.match(/<div class='t396__elem[^>]+>[\s\S]*?<\/div>\s*<\/div>/g) || [];
  elems.forEach((el, i) => {
    const anim = el.match(/data-animate-[a-z\-]+="[^"]+"/g);
    const top = el.match(/data-field-top-value="([^"]+)"/);
    const left = el.match(/data-field-left-value="([^"]+)"/);
    const inner = el.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`Elem ${i}: top=${top ? top[1] : ''}, left=${left ? left[1] : ''}, text=${inner.slice(0, 30)}, anim=${anim ? anim.join('; ') : 'none'}`);
  });
}
