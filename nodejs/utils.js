
//const { exec } = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const path = require('path');
const fs = require('fs');
var _ = require("underscore");
_.mixin(require('./mixins'))


function fileExists(filePath) {
  return fs.existsSync(filePath);
}
function createDirectoryIfNotExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Directory created: ${directoryPath}`);
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
  }
}

function calculateReadingTimeInSeconds(text, wordsPerMinute) {
    // Count the number of words in the text
    const wordCount = text.split(/\s+/).length;

    // Calculate the reading time in minutes
    const readingTimeMinutes = wordCount / wordsPerMinute;

    // Convert reading time to seconds
    const readingTimeSeconds = readingTimeMinutes * 60;

    return readingTimeSeconds;
}

// // Example usage:
// const textToRead = "In the ongoing case..."; // Replace with your text
// const wordsPerMinute = 250; // Adjust the reading speed as needed

// const estimatedTimeInSeconds = calculateReadingTimeInSeconds(textToRead, wordsPerMinute);
// console.log(`Estimated reading time: ${estimatedTimeInSeconds.toFixed(2)} seconds`);

/* 
function createTTS({text, filename}) {
  const currentPath = path.resolve(__dirname);
  console.log("🚀 ~ file: utils.js:27 ~ createTTS ~ currentPath:", currentPath)
  const outPath = `${currentPath}/tts/${filename}`;
  const command = `edge-tts --text "${text}" --voice en-US-ChristopherNeural --write-media ${outPath}.mp3 --write-subtitles ${outPath}.vtt`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Command execution failed: ${error}`);
      return;
    }
    console.log(`Audio created successfully at ${outPath}.mp3`);
    return {
        status: "success",
        path: outPath
    };
  });
}
 */


async function createTTS({text, id, force=false}) {
  
    const idpath = path.join(process.cwd(), `/public/assets/tts/${id}`);

    createDirectoryIfNotExists(idpath);
    const outPath = `${idpath}/${id}`;
    if(!force && fileExists(outPath+".mp3")){
      return new Promise((resolve, reject) => {
        var re =  {
          status: "success",
          path: `${outPath}.mp3`,
          alreadyExists : 'true'
        };
        resolve(re);
      });
    }
    //en-US-ChristopherNeural
    //en-US-GuyNeural
    const command = `edge-tts --text "${text}" --voice en-US-RogerNeural  --rate=+20%  --write-media ${outPath}.mp3 --write-subtitles ${outPath}.vtt`;
  
    try {
      const { stdout, stderr } = await exec(command);
      console.log(`Audio created successfully at ${outPath}.mp3`);
      return {
        status: "success",
        path: `${outPath}.mp3`
      };
    } catch (error) {
      console.error(`Command execution failed: ${error}`);
      return;
    }
}

async function createSTT({id, force=false}) {

    const idpath = path.join(process.cwd(), `/public/assets/tts/${id}`);

    createDirectoryIfNotExists(idpath);
    if(!force && fileExists(`${idpath}/${id}.json`)){
      return new Promise((resolve, reject) => {
        var re =  {
          status: "success",
          path: `${idpath}/${id}.json`,
          alreadyExists : 'true'
        };
        resolve(re);
      });
    }

    const inputfile = `${idpath}/${id}`;
    const command = `whisperx ${inputfile}.mp3 --compute_type int8 --output_format json --output_dir ${idpath}`;
  
    try {
      const { stdout, stderr } = await exec(command);
      const filePath =  `${idpath}/${id}.json`;
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(jsonData);
      console.log(`Transcript created successfully at ${idpath}`);
      return {
        status: "success",
        path: filePath,
        data
      };
    } catch (error) {
      console.error(`Command execution failed: ${error}`);
      return;
    }
}

  //usage example of createTTS
  async function createTTSnSTT({text, id, force=false}) {
    text = removeEmoticons(text);
    try {
      const tts = await createTTS({
        text,
        id, force: _.bool(force)
      });
      const stt = await createSTT({
        id, force: _.bool(force)
      })
      return {
        textToSpeech: tts,
        speechToTranscript: stt
      }
    } catch (error) {
      console.error(error);
    }
  }

  function removeEmoticons(str) {
    const emoticonRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    return str.replace(emoticonRegex, '');
  }
  
  //runCreateTTS();

module.exports = {
    calculateReadingTimeInSeconds,
    createTTS,
    createSTT,
    createTTSnSTT,
    fileExists,
    createDirectoryIfNotExists,
    removeEmoticons
}

/*
en-US-ChristopherNeural:

A male English (United States) voice known for its clear and natural sound.
en-US-DevonNeural:

Another male English (United States) voice that aims to sound human-like.
en-US-BenjaminRUS:

A male English (United States) voice that may offer a distinct and natural tone.
en-GB-RyanNeural:

A male English (United Kingdom) voice known for its expressive and realistic qualities.
en-AU-CraigNeural:

A male English (Australia) voice that might provide a natural Australian accent.

LINK: https://speech.microsoft.com/portal/voicegallery

Microsoft Edge TTS

options:
  -h, --help            show this help message and exit
  -t TEXT, --text TEXT  what TTS will say
  -f FILE, --file FILE  same as --text but read from file
  -v VOICE, --voice VOICE
                        voice for TTS. Default: en-US-AriaNeural
  -l, --list-voices     lists available voices and exits
  --rate RATE           set TTS rate. Default +0%.
  --volume VOLUME       set TTS volume. Default +0%.
  --pitch PITCH         set TTS pitch. Default +0Hz.
  --words-in-cue WORDS_IN_CUE
                        number of words in a subtitle cue. Default: 10.
  --write-media WRITE_MEDIA
                        send media output to file instead of stdout
  --write-subtitles WRITE_SUBTITLES
                        send subtitle output to provided file instead of stderr
  --proxy PROXY         use a proxy for TTS and voice list.

SUPPORTED:
en-AU-WilliamNeural
en-CA-LiamNeural
en-GB-RyanNeural
en-HK-SamNeural
en-IE-ConnorNeural
en-IN-PrabhatNeural
en-KE-ChilembaNeural
en-NG-AbeoNeural
en-NZ-MitchellNeural
en-PH-JamesNeural
en-SG-WayneNeural
en-TZ-ElimuNeural
en-US-ChristopherNeural
en-US-EricNeural
en-US-GuyNeural
en-US-RogerNeural
en-US-SteffanNeural
en-ZA-LukeNeural
*/