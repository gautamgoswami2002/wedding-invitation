const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

const audios = html.match(/https?:\/\/[^\s"'()><]+\.(?:mp3|mp4|webm|wav|m4a)/gi) || [];
console.log('--- Media files ---');
console.log([...new Set(audios)]);

const images = html.match(/https?:\/\/[^\s"'()><]+\.(?:png|jpg|jpeg|webp|svg|gif)/gi) || [];
console.log('--- Images count ---', images.length);
console.log('--- Unique images ---');
console.log([...new Set(images)]);

const fonts = html.match(/https?:\/\/[^\s"'()><]+\.(?:woff|woff2|ttf|otf)/gi) || [];
console.log('--- Fonts ---');
console.log([...new Set(fonts)]);

const fontFamilies = html.match(/font-family:[^;"}]+/gi) || [];
console.log('--- Font Families ---');
console.log([...new Set(fontFamilies)]);

// Search for iframe, youtube, vimeo, audio tag, music player, or custom scripts
const iframes = html.match(/<iframe[^>]+>/gi) || [];
console.log('--- Iframes ---', iframes);

const audioTags = html.match(/<audio[^>]+>/gi) || [];
console.log('--- Audio Tags ---', audioTags);

const videoTags = html.match(/<video[^>]+>/gi) || [];
console.log('--- Video Tags ---', videoTags);
