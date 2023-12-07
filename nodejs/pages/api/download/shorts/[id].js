import { downloadShorts } from '../../../shorts';

export default async function handler(req, res) {
  const id = req.query.id;
  const data = await downloadShorts(id);
  return res.json(data);
}
