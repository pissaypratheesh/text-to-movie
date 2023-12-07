import { createTTSnSTT } from '../../../utils';

export default async function handler(req, res) {
  const { summary, id } = req.body;
  const { force } = req.query;
  if(!summary || !id){
    return res.status(400).json({ error: 'Invalid request body' });
  }
  const speech = await createTTSnSTT({
    text: summary,
    id: id,
    force
  });
  return res.json(speech);
}
