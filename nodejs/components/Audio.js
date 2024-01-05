import React from 'react';

const AudioPlayer = ({src, link, url}) => {
  return (
    <audio controls>
      <source src={src || link || url} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;