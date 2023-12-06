const fs = require('fs');
const path = require('path');
const { getVideoDurationInSeconds } = require('get-video-duration');

const videoFolderPath = 'examples/assets/video';
const videoInfoPath = 'examples/assets/video/videoinfo.json';


fs.readdir(videoFolderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const videoFiles = files.filter(file => {
    const ext = path.extname(file);
    return ext === '.mov' || ext === '.mp4';
  });
  const videoDurations = {};

  const processVideo = (index) => {
    if (index < videoFiles.length) {
      const videoPath = path.join(videoFolderPath, videoFiles[index]);
      getVideoDurationInSeconds(videoPath).then((duration) => {
        videoDurations[videoFiles[index]] = duration;
        processVideo(index + 1);
      });
    } else {
      fs.writeFile(videoInfoPath, JSON.stringify(videoDurations, null, 2), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Video durations written to videoinfo.json');
        }
      });
    }
  };

  processVideo(0);
});
