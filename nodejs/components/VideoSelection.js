import React, { useState, useCallback, useEffect, useRef } from 'react';                                                                                                                                                     
import {Gallery} from 'react-grid-gallery';                                                                                                                                                                          
import YouTube from 'react-youtube';   
import VideoModal from './VideoModal';  
import Modal from 'react-modal';    

function createGalleryItems(videos, onSelect) {                                                                                                                                                                      
  return videos.map((videoUrl, index) => {                                                                                                                                                                           
    const videoId = videoUrl.videoId;                                                                                                                                                                                
    const thumbnailUrl = videoUrl.thumbnail.thumbnails[0].url;                                                                                                                                                       
    return {                                                                                                                                                                                                         
      src: thumbnailUrl,                                                                                                                                                                                             
      thumbnail: thumbnailUrl,                                                                                                                                                                                       
      thumbnailWidth: 320,                                                                                                                                                                                           
      thumbnailHeight: 180,                                                                                                                                                                                          
      videoId,                                                                                                                                                                                                       
    };                                                                                                                                                                                                               
  });                                                                                                                                                                                                                
}                                                                                                                                                                                                                    
const customStyles = {
    content: {
      top: '20%',
      left: '10%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%', // Adjust as needed
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };
//const customStyles = {}
/* {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
 */
function VideoSelection({ q }) {                                   
  const [selectedVideo, setSelectedVideo] = useState(null);                                                                                                                                                            
  const [selectedVideos, setSelectedVideos] = useState([]);                                                                                                                                                          
  const [showModal, setShowModal] = useState(false);                                                                                                                                                                 
  const [videos, setVideos] = useState([]);                                                                                                                                                                          
  const [query, setQuery] = useState(q);                                                                                                                                                                            

  useEffect(() => {                                                                                                                                                                                                  
    // const urlParams = new URLSearchParams(window.location.search);                                                                                                                                                   
    // const urlQuery = urlParams.get(q) || 'elephant and turtle';                                                                                                                                                
    // setQuery(urlQuery);                                                                                                                                                                                              
    fetch(`http://localhost:3000/api/fetchshorts?query=${encodeURIComponent(query)}`)                                                                                                                             
      .then((response) => response.json())                                                                                                                                                                           
      .then((data) => setVideos(data));                                                                                                                                                                              
  }, []);                                                                                                                                                                                                            

  
  const handleVideoSelect = (videoId) => {                                                                                                                                                                             
    setSelectedVideos((prevSelectedVideos) => {                                                                                                                                                                        
      if (prevSelectedVideos.includes(videoId)) {                                                                                                                                                                      
        return prevSelectedVideos.filter((id) => id !== videoId);                                                                                                                                                      
      } else {                                                                                                                                                                                                         
        return [...prevSelectedVideos, videoId];                                                                                                                                                                       
      }                                                                                                                                                                                                                
    });                                                                                                                                                                                                                
  };                                                                                                                                                                                                                

  const galleryItems = createGalleryItems(videos, handleVideoSelect);                                                                                                                                                

  const CustomThumbnail = useCallback(({ item }) => {                                                                                                                                                                
    const handleSelectClick = (e) => {                                                                                                                                                                               
      e.stopPropagation();                                                                                                                                                                                           
      handleVideoSelect(item.videoId);                                                                                                                                                                               
    };                                                                                                                                                                                                               

    const handlePlayClick = (e) => {                                                                                                                                                                                 
      setShowModal(true);                                                                                                                                                                                            
      e.stopPropagation();                                                                                                                                                                                           
      setSelectedVideo(item.videoId);                                                                                                                                                                                
    };                                                                                                                                                                                                               

    return (                                                                                                                                                                                                         
      <div>                                                                                                                                                                                                          
        <img src={item.thumbnail} alt={item.videoId} style={selectedVideos.includes(item.videoId) ? { border: '2px solid red' } : {}} />                                                                                                                                                              
        <div style={{ position: 'absolute', bottom: 0, right: 0, padding: '10px' }}>                                                                                                                                 
          <button                                                                                                                                                                                                    
            onClick={handleSelectClick}                                                                                                                                                                              
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2"                                                                           
          >                                                                                                                                                                                                          
            Select                                                                                                                                                                                                   
          </button>                                                                                                                                                                                                  
          <button                                                                                                                                                                                                    
            onClick={handlePlayClick}                                                                                                                                                                                
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2"                                                                             
          >                                                                                                                                                                                                          
            Play                                                                                                                                                                                                     
          </button>                                                                                                                                                                                                  
        </div>                                                                                                                                                                                                       
      </div>                                                                                                                                                                                                         
    );                                                                                                                                                                                                               
  }, [handleVideoSelect, setSelectedVideo]);                                                                                                                                                                         

  const handleSearchClick = () => {                                                                                                                                                                                  
    //window.history.pushState({}, '', `?query=${encodeURIComponent(query)}`);                                                                                                                                         
    fetch(`http://localhost:3000/api/fetchshorts?query=${encodeURIComponent(query)}`)                                                                                                                                
      .then((response) => response.json())                                                                                                                                                                           
      .then((data) => setVideos(data));                                                                                                                                                                              
  };                                                                                                                                                                                                                 

  const handleClose = () => {                                                                                                                                                                                        
    setShowModal(false);                                                                                                                                                                                             
  };                                                                                                                                                                                                                 

  const handleMultiSelectClick = () => {                                                                                                                                                                               
    console.log("Selected video IDs:", selectedVideos);                                                                                                                                                                
    // Make a call with the selected video IDs                                                                                                                                                                         
  };                                                                                                                                                                                                                   
         

  useEffect(() => {
    Modal.setAppElement(document.getElementById('__next'));
  }, []);
  console.log("🚀 ~ file: VideoSelection.js:109 ~ VideoSelection ~ showModal:", showModal)

  return (
    <div className="p-4">
      <div
        isOpen={showModal}
        onRequestClose={handleClose}
        style={{}}
        contentLabel="Video Modal"
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
      >
        <div>
            <VideoModal showModal={showModal} handleClose={handleClose} selectedVideo={selectedVideo} />    
        </div>
        
      </div>
      <div className="flex space-x-4 mb-4">                                                                                                                                                                           
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
          className="shadow appearance-none border rounded w-2/3 py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline flex-grow"
        />
        <button                                                                                                                                                                                                              
            onClick={handleSearchClick}                                                                                                                                                                                        
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded focus:outline-none focus:shadow-outline"                                                                                   
            >                                                                                                                                                                                                                    
          Search                                                                                                                                                                                                             
        </button>                                                                                                                                                                                                            
      </div>
      <div className="flex space-x-4 mb-4">
        <span className="text-lg">
          Selected: {selectedVideos.length}
        </span>
        <button
          onClick={handleMultiSelectClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 text-lg rounded focus:outline-none focus:shadow-outline"
        >
          UpdateSelected
        </button>
      </div>
                                                                                                                                                                                                          
      <Gallery                                                                                                                                                                                                     
        images={galleryItems}                                                                                                                                                                                      
        enableImageSelection={false}                                                                                                                                                                               
        thumbnailImageComponent={CustomThumbnail}                                                                                                                                                                  
      />                                                                                                                                                                                                           
    </div>                                                                                                                                                                                                           
  );                                                                                                                                                                                                                 
}                                                                                                                                                                                                                    

export default VideoSelection;
