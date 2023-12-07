export default function handler(req, res) {
  const { title, summary, id, memes } = req.body;

  if (!title || !summary || !id) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const response = { title, summary, id };
  if (memes) {
    response.memes = memes;
  }
  return res.json(response);
}
