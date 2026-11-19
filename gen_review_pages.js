const { execSync } = require('child_process');
const fs = require('fs');

const scrollPoints = [
  { name: '01_hero', y: 0 },
  { name: '02_message_countdown', y: 700 },
  { name: '03_countdown_schedule', y: 1300 },
  { name: '04_schedule_timeline', y: 1800 },
  { name: '05_location', y: 2400 },
  { name: '06_dresscode_palette', y: 3000 },
  { name: '07_dresscode_frames', y: 3500 },
  { name: '08_details_card', y: 4100 },
  { name: '09_closing_portrait', y: 4600 }
];

// Create an auto-scrolling visual review page
scrollPoints.forEach((sp, idx) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="style.css">
</head>
<body class="luxury-invitation-page">
  <script>
    fetch('/')
      .then(r => r.text())
      .then(h => {
        document.open();
        document.write(h);
        document.close();
        setTimeout(() => {
          // Open envelope immediately
          const overlay = document.getElementById('envelope-overlay');
          if (overlay) overlay.style.display = 'none';
          window.scrollTo(0, ${sp.y});
          // Trigger timeline flower update if on schedule
          window.dispatchEvent(new Event('scroll'));
        }, 150);
      });
  </script>
</body>
</html>
  `;
  fs.writeFileSync(`review_${sp.name}.html`, html);
});

console.log('Review pages generated');

