import React, { useState, useCallback, useEffect, useRef } from 'react';                                                                                                                                                     
import {Gallery} from 'react-grid-gallery';                                                                                                                                                                          
import YouTube from 'react-youtube';   
import VideoModal from './VideoModal';  
import Modal from 'react-modal';  
import { useStore } from "./StoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";  
var _ = require("underscore");
_.mixin(require('../mixins'))

function createGalleryItems(videos, onSelect) {                                                                                                                                                                      
  return videos.map((videoUrl, index) => {                                                                                                                                                                           
    const videoId = videoUrl.videoId;                                                                                                                                                                                
    const thumbnailUrl = videoUrl.thumbnail.thumbnails[0].url;                                                                                                                                                       
    return {     
      ...videoUrl,                                                                                                                                                                                                    
      src: thumbnailUrl,                                                                                                                                                                                             
      thumbnail: thumbnailUrl,                                                                                                                                                                                       
      thumbnailWidth: 320,                                                                                                                                                                                           
      thumbnailHeight: 180,                                                                                                                                                                                          
      videoId,
      vidIndex: videoUrl.i                                                                                                                                                                                                       
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
const VideoSelection = observer(function VideoSelection({ q, onVideoSelect, sentenceObj }) {                                   
  const [selectedVideo, setSelectedVideo] = useState(null);                                                                                                                                                            
  const [selectedVideos, setSelectedVideos] = useState(_.at(sentenceObj,'selectedVids') || []);                                                                                                                                                          
  const [showModal, setShowModal] = useState(false);                                                                                                                                                                 
  const [videos, setVideos] = useState([]);                                                                                                                                                                          
  console.log("🚀 ~ file: VideoSelection.js:53 ~ VideoSelection ~ videos:", videos)
  const [query, setQuery] = useState(q);                                                                                                                                                                            

  useEffect(() => {                                                                                                                                                                                                  
    // const urlParams = new URLSearchParams(window.location.search);                                                                                                                                                   
    // const urlQuery = urlParams.get(q) || 'elephant and turtle';                                                                                                                                                
    // setQuery(urlQuery);                                                                                                                                                                                              
    fetch(`http://localhost:3000/api/fetchshorts?query=${encodeURIComponent(query)}`)                                                                                                                             
      .then((response) => response.json())                                                                                                                                                                           
      .then((data) => {
        setVideos(data.map((vid,i) => {                                                                                                                                                                        
          vid.src = vid.url;  
          vid.i = i;                                                                                                                                                                                      
          return vid                                                                                                                                                                                                
        })) 
      });                                                                                                                                                                              
  }, []);                                                                                                                                                                                                            
  const handleVideoSelect = (video) => {
    let videoIndex = -1;
    const nextVideos = selectedVideos.map((vid, index) => {
      if (video.videoId === vid.videoId) {
        videoIndex = index;
        return { ...vid, isSelected: !vid.isSelected };
      } else {
        return vid;
      }
    });
  
    if (videoIndex !== -1) {
      nextVideos.splice(videoIndex, 1);
      //console.log("🚀 ~ file: VideoSelection.js:77 ~ nextVideos ~ nextVideos:", nextVideos)
    } else {
      nextVideos.push({ ...video, isSelected: true });
    }
  
    setSelectedVideos(nextVideos);
    onVideoSelect(nextVideos, q,sentenceObj);
  };
/*   const handleVideoSelect = (video) => {       
    let alreadyExisted = false;
    const nextVideos = selectedVideos.length > 0 ? selectedVideos.map((vid, i) => {                                                                                                                                                                       
        if(video.videoId == vid.videoId) {
          alreadyExisted = true;
          return { ...video, isSelected: !video.isSelected } 
        } else {
          return vid
        }      
      }                                                                                                                                          
    ) : [{...video, isSelected: true}];   
    if(!alreadyExisted) {
      nextVideos.push({ ...video, isSelected: true });
    }
    
    setSelectedVideos(nextVideos);                                                                                                                                                                                             
    const selVideos = nextVideos                                                                                                                                                                                  
      .filter((video) => video.isSelected)                                                                                                                                                                             
      .map((video) => {                                                                                                                                                                                                
        return { ...video, q };                                                                                                                                                                                        
      });                                                                                                                                                                                                              
    console.log(                                                                                                                                                                                                       
      "🚀 ~ file: VideoSelection.js ~ handleVideoSelect ~ selectedVideos:",                                                                                                                                            
      selVideos   ,selectedVideos                                                                                                                                                                                                
    );                                                                                                                                                                                                                 
    if (onVideoSelect) {                                                                                                                                                                                               
      onVideoSelect({ ...video, isSelected: !video.isSelected, q }, q);                                                                                                                                                
    }                                                                                                                                                                                                    
  };     */                                                                                                                                                                                                            

  const galleryItems = createGalleryItems(videos, handleVideoSelect);                                                                                                                                                

  const CustomThumbnail = useCallback(({ item }) => {    
    
    const checkExistence = (item) => {
      return _.find(selectedVideos, (obj) => obj.videoId === item.videoId);
    }
                                                                                                                                                                                                                      
    const handleCheckClick = (e) => {                                                                                                                                                                                  
      e.stopPropagation();                                                                                                                                                                                               
      handleVideoSelect(item);                                                                                                                                                                                 
    };    
    const handlePlayClick = (e) => {                                                                                                                                                                                 
      setShowModal(true);                                                                                                                                                                                            
      e.stopPropagation();                                                                                                                                                                                           
      setSelectedVideo(item);                                                                                                                                                                                
    };                                                                                                                                                                                                               

    return (                                                                                                                                                                                                         
      <div>                                                                                                                                                                                                          
        <img src={item.thumbnail} alt={item.videoId} style={checkExistence(item) ? { border: '3px solid red' } : {}} />                                                                                                                                                              
        <div style={{ position: 'absolute', bottom: 0, right: 0, padding: '10px' }}>                                                                                                                                 
          <button                                                                                                                                                                                                    
            onClick={handleCheckClick}                                                                                                                                                                              
            className={`bg-${selectedVideos.includes(item.videoId) ? 'blue' : 'gray'}-500 text-white px-2 py-1 rounded focus:outline-none focus:shadow-outline m-2 opacity-75 backdrop-blur-md text-sm`}                                                                            
          >                                                                                                                                                                                                          
             <i className="fa fa-check mr-1"></i>                                                                                                                                                                                                    
          </button>                                                                                                                                                                                                  
          <button                                                                                                                                                                                                    
            onClick={handlePlayClick}                                                                                                                                                                                
            className="bg-gray-500 text-white px-2 py-1 rounded focus:outline-none focus:shadow-outline m-2 opacity-75 backdrop-blur-md text-sm"                                                                              
          >                                                                                                                                                                                                          
            <i className="fa fa-play mr-1"></i>                                                                                                                                                                                                     
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
    if (onVideoSelect) {                                                                                                                                                                                               
      onVideoSelect(selectedVideos.length > 0 ? selectedVideos : [], q, sentenceObj);                                                                                                                                                                                    
    }        
                                                                                                                                                                   
  };                                                                                                                                                                                                                   
         

  useEffect(() => {
    Modal.setAppElement(document.getElementById('__next'));
  }, []);

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
            <VideoModal showModal={showModal} handleClose={handleClose} selectedVideo={selectedVideo} sentenceObj={sentenceObj}/>    
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
        <button
          onClick={(e)=>{
            e.stopPropagation();
            if(selectedVideos.length > 0){
              setSelectedVideos([]);
            }else{
              setSelectedVideos(videos);
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded focus:outline-none focus:shadow-outline"
        >
          { selectedVideos.length > 0 ? `Clear: ${selectedVideos.length}` : 'Select All'}
        </button>
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
})                                                                                                                                                                                                                    

export default VideoSelection;
