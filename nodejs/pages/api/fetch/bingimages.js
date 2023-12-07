import { getBingImages } from '../../../assets_scraper';

export default async function handler(req, res) {
  const prompt = req.query.prompt || req.query.query || req.query.q;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt/query' });
  }
  const images = await getBingImages(prompt);
  return res.send(images);
}
