import { fetchNewsData } from '../../../fetch_data';

export default async function handler(req, res) {
  const id = req.query.id;
  const data = await fetchNewsData({
    id, 
    lang: 'en',
    getsummary: true,
    getassets: true,
  });
  return res.json(data);
}
