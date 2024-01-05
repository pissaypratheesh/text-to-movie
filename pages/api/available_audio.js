import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const audioDirectory = path.join(process.cwd(), 'public/assets/audio/bg');
  const audioFiles = fs.readdirSync(audioDirectory).filter(file => file.endsWith('.mp3'));

  const audioList = audioFiles.map(file => {
    return {
      name: file,
      url: `/assets/audio/bg/${file}`
    };
  });

  res.status(200).json(audioList);
}
