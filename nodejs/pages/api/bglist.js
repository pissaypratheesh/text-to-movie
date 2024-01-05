import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const audioDirectory = path.join(process.cwd(), 'public/assets/audio/bg');
  const audioFiles = fs.readdirSync(audioDirectory).filter(file => file.endsWith('.mp3'));
  console.log("🚀 ~ file: bglist.js:13 ~ audioList ~ req.headers:", req)
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const audioList = audioFiles.map(file => {
    return {
      name: file,
      url: `${protocol}://${req.headers.host}/assets/audio/bg/${file}`
    };
  });

  res.status(200).json(audioList);
}
