import { fetchShorts } from '../../../shorts';

export default async function handler(req, res) {
  const query = req.query.q;
  const shorts = await fetchShorts(query);
  return res.json(shorts);
}
