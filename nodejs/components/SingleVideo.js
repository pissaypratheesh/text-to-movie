import ReactPlayer from 'react-player';
import Lightbox  from 'react-18-image-lightbox';
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
        <Lightbox mainSrc={videoUrl} onCloseRequest={handleClose}>
          <div>
            <ReactPlayer
              url={videoUrl}
              controls={true}
              width="100%"
              height="100%"
              volume={0.8}
              muted={false}
              playbackRate={1}
              pip={false}
              loop={false}
            />
            <a href={videoUrl} download>
              Download
            </a>
          </div>
        </Lightbox>
      )}
    </div>
  );
}

export default VideoLightbox