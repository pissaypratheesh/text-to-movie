import Lightbox  from 'yet-another-react-lightbox'; 
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import React from 'react';

function VideoLightbox({ videoUrl = "http://localhost:3000/assets/output/tevfi3olx2mlhnmf.mp4" }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const videos = [
    {
      type: "video",
      controls: true,
      height: 1280,
      loop: false,
      width: 720,
      poster:videoUrl ,
      sources: [
        {
          src:
          videoUrl,
          type: "video/mp4"
        }
      ]
    }
  ];
  

  const handleOpen = () => {

  console.log("🚀 ~ file: SingleVideo.js:33 ~ handleOpen ~ handleOpen:", isOpen)
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
          id="openvideo"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg m-4"
          onClick={handleOpen}
        >
          Open Video
        </button>
      {isOpen && (
        <Lightbox                                                                                                                                                                                              
            close={handleClose}   
            plugins={[Video]}    
            video={{
              controls: true,
              playsInline: true,
              autoPlay: true,
              loop: false,
              muted: true,
              disablePictureInPicture: true,
              disableRemotePlayback: true,
              controlsList: [],
              crossOrigin: true,
              preload: true,
            }}                                                                                                                                                                              
            slides={[                                                                                                                                                                                                   
                ...videos                                                                                                                                                                                                       
            ]}                                                                                                                                                                                                         
            open={isOpen}                                                                                                                                                                                              
        />        
      )}
    </div>
  );
}

export default VideoLightbox
