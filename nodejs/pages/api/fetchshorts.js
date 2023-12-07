import { fetchShorts } from '../../others/shorts';

export default async function handler(req, res) {
  const query = req.query.q || req.query.query || req.query.p || req.query.prompt;
  const shorts = await fetchShorts(query);
  return res.json(shorts);
}
