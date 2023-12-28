export default function handler(req, res) {
  const { title, summary, id, memes } = req.body;


  return res.json([
    {'index': 0, 'line': 'Robot dancing with gods.'},
    {'index': 1, 'line': 'Sun sets, warm city glow.'},
    {'index': 2, 'line': 'Forest walk, birds chirp.'},
    {'index': 3, 'line': 'Quiet library, books imagination.'},
    {'index': 4, 'line': 'Freshly baked bread aroma.'}
  ]);
}
