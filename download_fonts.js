const fs = require('fs');
const path = require('path');
const https = require('https');

const fontsDir = path.join(__dirname, 'assets', 'fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fonts = [
  { name: 'ImperialScript-Regular.woff', url: 'https://static.tildacdn.net/tild6539-6431-4034-a532-306634383864/ImperialScript-Regul.woff' },
  { name: 'Ovo-Regular.woff', url: 'https://static.tildacdn.net/tild3636-3163-4565-b630-326363636663/Ovo-Regular.woff' },
  { name: 'GT-Super-Display-Light.woff', url: 'https://static.tildacdn.net/tild6165-6665-4633-a637-613933653531/GT-Super-Display-Lig.woff' }
];

fonts.forEach(f => {
  const dest = path.join(fontsDir, f.name);
  const file = fs.createWriteStream(dest);
  https.get(f.url, (res) => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Saved font ${f.name} (${fs.statSync(dest).size} bytes)`);
    });
  }).on('error', err => console.error(err));
});
