import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const audioDirectory = path.join(process.cwd(), 'public/assets/audio/bg');
  
  res.status(200).json(audioList);
}
