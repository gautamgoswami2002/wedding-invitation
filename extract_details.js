const fs = require('fs');
const html = fs.readFileSync('template5_raw.html', 'utf8');

// Find font-face declarations
const fontFaces = html.match(/@font-face\s*\{[^}]+\}/gi) || [];
console.log('--- Font faces ---');
console.log(fontFaces);

// Find video tag and its sources
const videoMatches = html.match(/<video[\s\S]*?<\/video>/gi) || [];
console.log('--- Video Matches ---');
console.log(videoMatches);

// Find custom scripts or inline scripts with audio/video/animation logic
const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total scripts:', scripts.length);

// Print scripts that mention audio or video or bgVideo or popup
scripts.forEach((s, i) => {
  if (s.includes('bgVideo') || s.includes('audio') || s.includes('invitation') || s.includes('countdown') || s.includes('popup')) {
    console.log(`\n=== Script ${i} ===\n`, s.slice(0, 1500));
  }
});
