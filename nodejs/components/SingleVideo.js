import ReactPlayer from 'react-player';
import Lightbox  from 'react-image-lightbox';
import React from 'react';

function VideoLightbox({ videoUrl = "http://localhost:3000/assets/output/tevfi3olx2mlhnmf.mp4" }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>Open Video</button>
      {isOpen && (
        <Lightbox
          mainSrc={<ReactPlayer
            url={videoUrl}
            controls={true}
            width="100%"
            height="100%"
            volume={0.8}
            muted={false}
            playbackRate={1}
            pip={false}
            loop={false}
          />}
          onCloseRequest={handleClose}
          imageCaption={<a href={videoUrl} download>Download</a>}
        />
      )}
    </div>
  );
}

export default VideoLightbox
