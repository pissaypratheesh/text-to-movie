import React, { useState, useCallback, useEffect } from 'react';                                                                                                                                                     
import {Gallery} from 'react-grid-gallery';                                                                                                                                                                          
import YouTube from 'react-youtube';                                                                                                                                                                                 
import VideoModal from './VideoModal';  

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

function VideoSelection() {                                   
  const [selectedVideo, setSelectedVideo] = useState(null);                                                                                                                                                            
  const [selectedVideos, setSelectedVideos] = useState([]);                                                                                                                                                          
  const [showModal, setShowModal] = useState(false);                                                                                                                                                                 
  const [videos, setVideos] = useState([]);                                                                                                                                                                          
  const [query, setQuery] = useState('');                                                                                                                                                                            

  useEffect(() => {                                                                                                                                                                                                  
    const urlParams = new URLSearchParams(window.location.search);                                                                                                                                                   
    const urlQuery = urlParams.get('query') || 'elephant and turtle';                                                                                                                                                
    setQuery(urlQuery);                                                                                                                                                                                              
    fetch(`http://localhost:3000/api/fetchshorts?query=${encodeURIComponent(urlQuery)}`)                                                                                                                             
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
        <img src={item.thumbnail} alt={item.videoId} />                                                                                                                                                              
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
    window.history.pushState({}, '', `?query=${encodeURIComponent(query)}`);                                                                                                                                         
    fetch(`http://localhost:3000/api/fetchshorts?query=${encodeURIComponent(query)}`)                                                                                                                                
      .then((response) => response.json())                                                                                                                                                                           
      .then((data) => setVideos(data));                                                                                                                                                                              
  };                                                                                                                                                                                                                 

  const handleClose = () => {                                                                                                                                                                                        
    setShowModal(false);                                                                                                                                                                                             
  };                                                                                                                                                                                                                 

  return (                                                                                                                                                                                                           
    <div className="p-4">                                                                                                                                                                                             
      <VideoModal showModal={showModal} handleClose={handleClose} selectedVideo={selectedVideo} />                                                                                                                                                                                                                
      <div className="flex space-x-4 mb-4">                                                                                                                                                                           
        <input                                                                                                                                                                                                     
          type="text"                                                                                                                                                                                              
          value={query}                                                                                                                                                                                            
          onChange={(e) => setQuery(e.target.value)}                                                                                                                                                               
          placeholder="Enter your search query"                                                                                                                                                                    
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline flex-grow"                                            
        />                                                                                                                                                                                                         
        <button                                                                                                                                                                                                    
          onClick={handleSearchClick}                                                                                                                                                                              
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded focus:outline-none focus:shadow-outline"                                                                    
        >                                                                                                                                                                                                          
          Search                                                                                                                                                                                                   
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