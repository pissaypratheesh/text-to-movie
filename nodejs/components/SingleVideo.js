import ReactPlayer from 'react-player';
//import Lightbox  from 'react-image-lightbox';/
//import Lightbox  from 'react-18-image-lightbox';  
import Lightbox  from 'yet-another-react-lightbox'; 
import "yet-another-react-lightbox/styles.css";
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
            onClose={handleClose}                                                                                                                                                                                      
            media={[                                                                                                                                                                                                   
            {                                                                                                                                                                                                        
                src: videoUrl,                                                                                                                                                                                         
                type: "video",                                                                                                                                                                                         
                alt: "Video",                                                                                                                                                                                          
                caption: <a href={videoUrl} download>Download</a>,                                                                                                                                                     
            },                                                                                                                                                                                                       
            ]}                                                                                                                                                                                                         
            open={isOpen}                                                                                                                                                                                              
        />        
      )}
    </div>
  );
}

export default VideoLightbox
