const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

const match = html.match(/<div id="rec2003555721"[\s\S]*?(?=<div id="rec\d+)/);
if (match) {
  const content = match[0];
  console.log('--- rec2003555721 artboard & images ---');
  const ab = content.match(/data-artboard-[^=]+="[^"]+"/g);
  console.log(ab);

  const elems = content.match(/<div class='t396__elem[^>]+>[\s\S]*?<\/div>\s*<\/div>/g) || [];
  elems.forEach((el, i) => {
    const type = el.match(/data-elem-type="([^"]+)"/) || el.match(/data-elem-type='([^']+)'/);
    const top = el.match(/data-field-top-value="([^"]+)"/);
    const left = el.match(/data-field-left-value="([^"]+)"/);
    const w = el.match(/data-field-width-value="([^"]+)"/);
    const h = el.match(/data-field-height-value="([^"]+)"/);
    const src = el.match(/data-original="([^"]+)"/) || el.match(/data-original='([^']+)'/);
    const inner = el.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`Elem ${i}: type=${type ? type[1] : ''}, top=${top ? top[1] : ''}, left=${left ? left[1] : ''}, w=${w ? w[1] : ''}, src=${src ? src[1].split('/').pop() : ''}, text=${inner.slice(0, 30)}`);
  });
}
