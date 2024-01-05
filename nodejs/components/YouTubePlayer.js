import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId, onReady }) => {
  return (
    <YouTube
      videoId={videoId.split("/").pop()}
      onReady={onReady}
      opts={{
        playerVars: {
          height: "390",
          width: "640",
          autoplay: 1,
        },
      }}
      className="mx-auto"
    />
  );
};

export default YouTubePlayer;
