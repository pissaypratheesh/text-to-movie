import { NextApiRequest, NextApiResponse } from 'next';
import ffmpeg from 'fluent-ffmpeg';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { videoUrl, startTime, duration } = req.query;

  if (!videoUrl || !startTime || !duration) {
    res.status(400).send('Error: Missing videoUrl, startTime, or duration query parameter');
    return;
  }

  try {
    res.setHeader('Content-Type', 'video/mp4');
    ffmpeg(videoUrl)
      .seekInput(startTime)
      .duration(duration)
      .outputOptions('-c copy')
      .outputFormat('mp4')
      .pipe(res);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
