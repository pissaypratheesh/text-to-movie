import React from 'react';

const AudioPlayer = ({src, link, url, play=false}) => {
  return (
    <audio controls autoPlay={play}>
      <source src={src || link || url} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
