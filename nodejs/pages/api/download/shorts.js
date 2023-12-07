import { downloadMultipleShorts } from '../../../fetch_data';

export default async function handler(req, res) {
  const ids = req.body.ids; // Assuming ids is an array of IDs in the request body
  const data = await downloadMultipleShorts(ids);
  return res.json(data);
}
