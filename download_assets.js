const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const assets = [
  // Flaps & Seal
  { name: 'polygon_top.png', url: 'https://static.tildacdn.net/tild3762-3738-4361-b134-333538333135/Polygon_1_3.png' },
  { name: 'polygon_bottom.png', url: 'https://static.tildacdn.net/tild6262-6339-4933-b833-343039643037/Polygon_2_1.png' },
  { name: 'polygon_right.png', url: 'https://static.tildacdn.net/tild3636-6566-4132-b665-343766326335/Polygon_3.png' },
  { name: 'polygon_left.png', url: 'https://static.tildacdn.net/tild6338-3733-4431-a363-306634383864/Polygon_4.png' },
  { name: 'wax_seal.png', url: 'https://static.tildacdn.net/tild3435-3731-4464-a537-636664626563/ChatGPT_Image_Aug_3_.png' },
  
  // Torn paper divider
  { name: 'torn_edge.svg', url: 'https://static.tildacdn.net/tild3832-6561-4131-b539-313934396635/Mask_group_2_1_Trace.svg' },
  
  // Flowers & Decor
  { name: 'ruby_rose_cluster.png', url: 'https://static.tildacdn.net/tild6637-6363-4432-b364-633830313533/noroot.png' },
  { name: 'ruby8.png', url: 'https://static.tildacdn.net/tild3565-3335-4966-b062-366237626361/8ruby.png' },
  { name: 'ruby7.png', url: 'https://static.tildacdn.net/tild3533-3266-4863-b762-326134376538/7uruby.png' },
  { name: 'ruby6.png', url: 'https://static.tildacdn.net/tild3064-6534-4135-b730-353630663233/6druby.png' },
  { name: 'ruby4.png', url: 'https://static.tildacdn.net/tild3138-3862-4931-a264-313932393437/4ruby.png' },
  { name: 'ruby2.png', url: 'https://static.tildacdn.net/tild3063-6162-4734-b966-356139343638/2ruby.png' },
  { name: 'ruby1.png', url: 'https://static.tildacdn.net/tild3166-6235-4730-b332-636366333436/1ruby.png' },
  
  // Timeline Flower
  { name: 'camellia_flower.png', url: 'https://static.tildacdn.net/tild3036-6339-4661-b266-303136653461/ChatGPT_Image_Nov_17.png' },
  
  // Venue sketch
  { name: 'chateau_sketch.png', url: 'https://static.tildacdn.net/tild6161-3933-4132-b732-303939666537/image-gen_1-Photoroo.png' },
  
  // Frames
  { name: 'frame_men.png', url: 'https://static.tildacdn.net/tild3433-3734-4762-a164-666138626132/Group_170.png' },
  { name: 'frame_women.png', url: 'https://static.tildacdn.net/tild3732-6333-4264-b465-666237366336/Group_169.png' },
  
  // Couple Photo
  { name: 'couple_photo.png', url: 'https://static.tildacdn.net/tild3530-3262-4233-b530-616132323935/Rectangle_230.png' },
  { name: 'wedding_preview.png', url: 'https://static.tildacdn.net/tild3338-6332-4463-b639-623665353237/300592484d1f31590325.png' },
  
  // Audio music
  { name: 'wedding_song.mp3', url: 'https://pub-4dc8201144ca418fb604349c73e8c724.r2.dev/Alex%20Warren%20-%20Ordinary%20Lyrics.mp3' },
  
  // Video
  { name: 'fountain_bg.mp4', url: 'https://assets.webgencyinvitations.com/IMG_6230%20(1)%20(1).mp4' }
];

function downloadFile(item) {
  return new Promise((resolve) => {
    const dest = path.join(assetsDir, item.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`[EXISTS] ${item.name}`);
      return resolve(true);
    }
    
    const file = fs.createWriteStream(dest);
    const client = item.url.startsWith('https') ? https : http;
    
    console.log(`Downloading: ${item.name} from ${item.url}`);
    
    const request = client.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (response) => {
      // Handle redirect if any
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Redirecting ${item.name} to ${response.headers.location}`);
        return downloadFile({ name: item.name, url: response.headers.location }).then(resolve);
      }
      
      if (response.statusCode !== 200) {
        console.error(`Failed to download ${item.name}: Status ${response.statusCode}`);
        file.close();
        fs.unlink(dest, () => {});
        return resolve(false);
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`[DONE] ${item.name} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      });
    });
    
    request.on('error', (err) => {
      console.error(`Error downloading ${item.name}:`, err.message);
      file.close();
      fs.unlink(dest, () => {});
      resolve(false);
    });
    
    request.setTimeout(45000, () => {
      console.error(`Timeout downloading ${item.name}`);
      request.destroy();
      file.close();
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

async function run() {
  for (const item of assets) {
    await downloadFile(item);
  }
  console.log('All downloads completed!');
}

run();
