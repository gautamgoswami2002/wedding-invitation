const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

function inspectRec(recId) {
  const match = html.match(new RegExp(`<div id="${recId}"[\\s\\S]*?(?=<div id="rec\\d+"|<\\/div>\\s*<\\!--\\/allrecords-->)`));
  if (match) {
    console.log(`\n================== REC ${recId} ==================\n`);
    console.log(match[0].slice(0, 3000));
  }
}

inspectRec('rec2052873013'); // audio button
inspectRec('rec2052858183'); // popup form
