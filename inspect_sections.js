const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

function inspectRec(recId) {
  const regex = new RegExp('<div id="' + recId + '"[\\s\\S]*?(?=<div id="rec\\d+"|$)', 'g');
  const match = regex.exec(html);
  if (match) {
    console.log(`\n=== RECORD ${recId} ===`);
    const content = match[0];
    const ab = content.match(/data-artboard-[^=]+="[^"]+"/g);
    console.log('Artboard:', ab);

    const elems = content.match(/<div class='t396__elem[^>]+>[\s\S]*?<\/div>\s*<\/div>/g) || [];
    elems.forEach((el, i) => {
      const type = el.match(/data-elem-type="([^"]+)"/) || el.match(/data-elem-type='([^']+)'/);
      const top = el.match(/data-field-top-value="([^"]+)"/);
      const left = el.match(/data-field-left-value="([^"]+)"/);
      const w = el.match(/data-field-width-value="([^"]+)"/);
      const h = el.match(/data-field-height-value="([^"]+)"/);
      const inner = el.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`Elem ${i}: type=${type ? type[1] : ''}, top=${top ? top[1] : ''}, left=${left ? left[1] : ''}, w=${w ? w[1] : ''}, h=${h ? h[1] : ''}, text=${inner.slice(0, 50)}`);
    });
  }
}

inspectRec('rec2003555721'); // Details
inspectRec('rec2003860951'); // Confirm attendance
inspectRec('rec2003869491'); // Hope to see you there
