import { fetchNewsSummaryAssets } from '../../../fetch_data';

export default async function handler(req, res) {
  const id = req.query.id;
  const lang = req.query.lang || 'en';
  let data = await fetchNewsSummaryAssets({
    id, 
    lang,
    getsummary: true,
    getassets: true,
  });
  return res.json(data);
}
