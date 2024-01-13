import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
import {fileExists} from '../../utils'

function fetchFileName(url){
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    return fileName.replace('.mp3', '');
}

export default async function handler(req, res) {
  const { tts, bg } = req.query;
  //tts http://localhost:3000/assets/tts/Fbbu_GQcrwc/Fbbu_GQcrwc.mp3
  let ttspath = path.join(process.cwd(), `public/assets/${tts.split('assets/')[1]}`)
  let bgpath = path.join(process.cwd(), `public/assets/${bg.split('assets/')[1]}`)
  if(!fileExists(ttspath)){
    return res.status(500).json({ error: "Error blending audio files: TTS file not found" });
  }

  console.log("🚀 ~ file: blendaudio.js:9 ~ handler ~ tts, bg:", tts, bg)
  let audio1 = ttspath;
  let audio2 = bgpath;

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
 

  const outputDirectory = path.join(process.cwd(), "public/assets/audio/blend");
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  const outputFilename = `${fetchFileName(audio1)}_${fetchFileName(audio2)}.mp3`;
  const outputPath = path.join(outputDirectory, outputFilename);
  if(fileExists(outputPath)){
    return res.status(200).json({ path: `/assets/audio/blend/${outputFilename}`, url: `${protocol}://${req.headers.host}/assets/audio/blend/${outputFilename}`});
  }
  const command = `ffmpeg -i ${audio1} -i ${audio2} -filter_complex "[1:a]adelay=0|0[volume];[volume]volume=0.01[a2];[0:a][a2]amix=inputs=2[aout]" -map "[aout]" -c:a mp3 -t $(ffprobe -i ${audio1} -show_entries format=duration -v quiet -of csv="p=0") ${outputPath}`;

//  const command = `ffmpeg -i ${audio1} -i ${audio2} -filter_complex "[0:a]volume=1[a1];[1:a]volume=0.1[a2];[a1][a2]amix=inputs=2" -c:a mp3 ${outputPath}`;
  console.log("\n\n\n🚀 ~ file: blendaudio.js:38 ~ handler ~ outputPath:", outputPath)
  console.log("🚀 ~ file: blendaudio.js:44 ~ handler ~ command:", command)

  try {
    await execAsync(command);
    res.status(200).json({ path: `/assets/audio/blend/${outputFilename}`, url: `${protocol}://${req.headers.host}/assets/audio/blend/${outputFilename}`});
  } catch (error) {
    console.error("Error blending audio files:", error);
    res.status(500).json({ error: "Error blending audio files" });
  }
}
