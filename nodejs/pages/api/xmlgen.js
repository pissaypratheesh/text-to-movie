import { NextApiRequest, NextApiResponse } from 'next';

function dataToXml(data) {
  // Convert the data to XML format
  // This is a placeholder implementation, replace it with your desired XML conversion logic
  return `<data>${data}</data>`;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;
    const xml = dataToXml(data);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ xml });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
