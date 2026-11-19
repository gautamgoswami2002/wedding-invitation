const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

const match = html.match(/<div id="rec2003869491"[\s\S]*?(?=<div id="rec\d+|<\/div>\s*<!--\/allrecords-->)/);
if (match) {
  console.log('--- rec2003869491 block ---');
  console.log(match[0]);
}
