import { NextApiRequest, NextApiResponse } from 'next';
import ffmpeg from 'fluent-ffmpeg';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { videoUrl, time } = req.query;

  if (!videoUrl || !time) {
    res.status(400).send('Error: Missing videoUrl or time query parameter');
    return;
  }

  try {
    res.setHeader('Content-Type', 'image/jpeg');
    ffmpeg(videoUrl)
      .seekInput(time)
      .outputOptions('-vframes 1')
      .outputFormat('image2')
      .pipe(res);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
