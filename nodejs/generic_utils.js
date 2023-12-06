const { getVideoDurationInSeconds } = require('get-video-duration')

const chineseComma = "，"
function splitStringIntoLines(inputString, maxCharactersPerLine) {
    const words = inputString.split(' ');
    let currentLine = '';
    let result = '';

    for (const word of words) {
        if (currentLine.length + word.length + 1 <= maxCharactersPerLine) {
            // If adding the current word and a space fits in the line, add them
            if (currentLine !== '') {
                currentLine += ' ';
            }
            currentLine += word;
        } else {
            // If adding the current word would exceed the limit, start a new line
            result += currentLine + chineseComma;
            currentLine = word;
        }
    }

    // Add the last line
    result += currentLine;

    return result;
}

function getVideoDurationSync(filePath) {
    try {
      const metadata = ffmpeg.ffprobeSync(filePath);
      const durationInSeconds = metadata.format.duration;
      return durationInSeconds;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

module.exports = {
    splitStringIntoLines,
    getVideoDurationSync,
}