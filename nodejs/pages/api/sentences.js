export default function handler(req, res) {
  const { title, summary, id, memes } = req.body;


  return res.json([
    {'index': 0, 'line': "🎉 Happy New Year, 2024's here with exciting AI plans!"},
    {'index': 1, 'line': '🦙 Llama 3 dropping in H1 2024, closing gap with proprietary models.'},
    {'index': 2, 'line': '🔮 Gemini Ultra by Google to be released in H1 2024, competition for GPT-4.'},
    {'index': 3, 'line': "🤖 Tesla's Optimus robot to make progress, other companies to release robots."},
    {'index': 4, 'line': '🚀 Open-source AI models catching up, Apple joining open-source game.'},
    {'index': 5, 'line': '🤔 No AGI in 2024, but AI agents and multimodal models to improve.'},
    {'index': 6, 'line': '🛡️ Bots getting harder to detect, security concerns rising.'}
]);
}
