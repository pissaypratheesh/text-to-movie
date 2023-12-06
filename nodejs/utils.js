
//const { exec } = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const path = require('path');
const fs = require('fs');

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
    const currentPath = path.resolve(__dirname);
    const idpath = `${currentPath}/tts/${id}`;

    createDirectoryIfNotExists(idpath);
    const outPath = `${idpath}/${id}`;
    if(!force && fileExists(outPath+".mp3")){
      return new Promise((resolve, reject) => {
        var re =  {
          status: "success",
          path: idpath,
          alreadyExists : 'true'
        };
        resolve(re);
      });
    }
    const command = `edge-tts --text "${text}" --voice en-US-ChristopherNeural --write-media ${outPath}.mp3 --write-subtitles ${outPath}.vtt`;
  
    try {
      const { stdout, stderr } = await exec(command);
      console.log(`Audio created successfully at ${outPath}.mp3`);
      return {
        status: "success",
        path: outPath
      };
    } catch (error) {
      console.error(`Command execution failed: ${error}`);
      return;
    }
}

async function createSTT({id, force=false}) {

    const currentPath = path.resolve(__dirname);
    const idpath = `${currentPath}/tts/${id}`;

    createDirectoryIfNotExists(idpath);
    if(!force && fileExists(`${idpath}/${id}.json`)){
      return new Promise((resolve, reject) => {
        var re =  {
          status: "success",
          path: idpath,
          alreadyExists : 'true'
        };
        resolve(re);
      });
    }

    const inputfile = `${idpath}/${id}`;
    const command = `whisperx ${inputfile}.mp3 --compute_type int8 --output_format json --output_dir ${idpath}`;
  
    try {
      console.log("\n\n\n\n🚀 ~ file: utils.js:57 ~ createSTT ~ command:", command)
      const { stdout, stderr } = await exec(command);
      console.log(`Transcript created successfully at ${idpath}`);
      return {
        status: "success",
        path: idpath
      };
    } catch (error) {
      console.error(`Command execution failed: ${error}`);
      return;
    }
}

  //usage example of createTTS
  async function createTTSnSTT({text, id, force=false}) {
    try {
      const tts = await createTTS({
        text,
        id, force
      });
      console.log("\n\n\n\n🚀 ~ file: utils.js:116 ~ createTTSnSTT ~ tts:", tts)
      const stt = await createSTT({
        id, force
      })
      console.log("\n\n\nsttttt--->",stt)
      return {
        textToSpeech: tts,
        speechToTranscript: stt
      }
    } catch (error) {
      console.log("\n\n\n🚀 ~ file: utils.js:124 ~ createTTSnSTT ~ error:", error)
      console.error(error);
    }
  }
  
  //runCreateTTS();

module.exports = {
    calculateReadingTimeInSeconds,
    createTTS,
    createSTT,
    createTTSnSTT,
    fileExists,
    createDirectoryIfNotExists,
}