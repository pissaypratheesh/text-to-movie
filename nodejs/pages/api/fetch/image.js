import { fetchImageByPrompt } from '../../../fetch_data';

export default async function handler(req, res) {
  const prompt = req.query.prompt || req.query.query || req.query.q;
  if (!prompt) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  const image = await fetchImageByPrompt({ title: prompt });
  res.set('Content-Type', 'image/jpeg');
  return res.send(image);
}
