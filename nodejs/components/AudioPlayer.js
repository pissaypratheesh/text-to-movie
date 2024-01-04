import React, { useEffect, useRef } from "react";

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
    }
  }, [audioUrl]);

  return <audio ref={audioRef} controls />;
};

export default AudioPlayer;
