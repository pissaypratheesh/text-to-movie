import { fetchShortsNDownloadRelevant } from '../../../shorts';

export default async function handler(req, res) {
  const query = req.query.q;
  const shorts = await fetchShortsNDownloadRelevant(query);
  return res.json(shorts);
}
