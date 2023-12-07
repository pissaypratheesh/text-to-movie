import { fetchShorts } from '../../../others/shorts';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const id = req.query.id;
  const filePath = `./youtubevids/${id}.mp4`;
  const fpath =  path.join(__dirname, filePath);

  if (fs.existsSync(fpath)) {
    res.sendFile(fpath);
  } else {
    res.status(404).send({ err: 'File not found' });
  }
}
