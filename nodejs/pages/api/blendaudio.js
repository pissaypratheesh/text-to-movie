import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

export default async function handler(req, res) {
  const { audio1, audio2 } = req.query;

  const outputDirectory = path.join(process.cwd(), "public/assets/audio/blend");
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  const outputFilename = `${Date.now()}.mp3`;
  const outputPath = path.join(outputDirectory, outputFilename);

  const command = `ffmpeg -i ${audio1} -i ${audio2} -filter_complex "[0:a]volume=1[a1];[1:a]volume=0.3[a2];[a1][a2]amix=inputs=2" -c:a mp3 ${outputPath}`;

  try {
    await execAsync(command);
    res.status(200).json({ path: `/assets/audio/blend/${outputFilename}` });
  } catch (error) {
    console.error("Error blending audio files:", error);
    res.status(500).json({ error: "Error blending audio files" });
  }
}
