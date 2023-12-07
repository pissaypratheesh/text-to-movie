import React, { useEffect, useState, useCallback } from 'react';                                                                                                                                                                  
import axios from 'axios';                                                                                                                                                                                           
import { Gallery } from "react-grid-gallery";     
import Lightbox from 'react-18-image-lightbox';

                                                                                                                                                                                                                     
function ImageSelection({ q }) {                                                                                                                                                                                          
  console.log("🚀 ~ file: ImageSelection.js:6 ~ ImageSelection ~ q:", q)
  const [images, setImages] = useState([]);                                                                                                                                                                                                               
  const [query, setQuery] = useState(q || '');                                                                                                                                                                    
  const hasSelected = images.some((image) => image.isSelected);                                                                                                                                                      
  const fetchImages = async () => {                                                                                                                                                                                  
    try {                                                                                                                                                                                                            
      const response = await axios.get(`/api/fetch/bingimages?query=${query}`);                                                                                                                                      
      console.log("🚀 ~ file: index.js:13 ~ fetchImages ~ response.data:", response.data)                                                                                                                            
      if(response.data){                                                                                                                                                                                             
         setImages(response.data.map(img => {                                                                                                                                                                        
           img.src = img.url;                                                                                                                                                                                        
           return img                                                                                                                                                                                                
         }));                                                                                                                                                                                                        
      }                                                                                                                                                                                                              
    } catch (error) {                                                                                                                                                                                                
      console.error('Failed to fetch images:', error);                                                                                                                                                               
    }                                                                                                                                                                                                                
  };                                                                                                                                                                                                                 
                                                                                                                                                                                                                     
  useEffect(() => {  
    // const urlParams = new URLSearchParams(window.location.search);                                                                                                                                                   
    // const urlQuery = urlParams.get('q') || 'elephant and turtle';                                                                                                                                                
   // setQuery(urlQuery);                                                                                                                                                                                                                                             
   fetchImages()                                                                                                                                                                                                   
  },[])                                                                                                                                                                                                              
              
  const CustomThumbnail = useCallback(({ item }) => {  
    const [isClicked, setIsClicked] = useState(false);   
    const handleButtonClick = (e) => {                                                                                                                                                                                 
        e.stopPropagation();                                                                                                                                                                                             
        setIsClicked(!isClicked);                                                                                                                                                                                        
        navigator.clipboard.writeText(item.src);                                                                                                                                                                         
      };                                                                                                                                                                    
    // const handleCopyClick = (e) => {                                                                                                                                                                                   
    //   e.stopPropagation();                                                                                                                                                                                             
    //   navigator.clipboard.writeText(item.src);                                                                                                                                                                         
    // };                                                                                                                                                                                                                 
                                                                                                                                                                                                                       
    return (                                                                                                                                                                                                           
      <div>                                                                                                                                                                                                            
        <img src={item.url || item.src} alt={item.src} />                                                                                                                                                                    
        <div style={{ position: 'absolute', bottom: 0, right: 0, padding: '10px' }}>                                                                                                                                   
          <button                                                                                                                                                                                                      
            onClick={handleButtonClick}                                                                                                                                                                                  
            className={`bg-${isClicked ? 'blue' : 'gray'}-500 text-white px-2 py-1 rounded focus:outline-none focus:shadow-outline m-2 opacity-75 backdrop-blur-md text-sm`}                                                                                                                
          >                                                                                                                                                                                                            
            <i className="fa fa-copy"></i>                                                                                                                                                                                                 
          </button>                                                                                                                                                                                                    
        </div>                                                                                                                                                                                                         
      </div>                                                                                                                                                                                                           
    );                                                                                                                                                                                                                 
  }, []); 

  const onImageSelected = async (index, image) => {                                                                                                                                                                  
   if(images){                                                                                                                                                                                                       
    try {                                                                                                                                                                                                            
      const updateRes = await axios.post('/api/updateSelectedImages', {                                                                                                                                              
        selectedImages: images.filter(img => img.isSelected),                                                                                                                                                        
      });                                                                                                                                                                                                            
      console.log("🚀 ~ file: index.js:35 ~ onSelectImage ~ updateRes:", updateRes)                                                                                                                                  
    } catch (error) {                                                                                                                                                                                                
      console.error('Failed to update selected images:', error);                                                                                                                                                     
    }                                                                                                                                                                                                                
   }                                                                                                                                                                                                                 
  }                                                                                                                                                                                                                  
                                                                                                                                                                                                                     
  const handleSelect = (index, item, event) => {                                                                                                                                                                     
    const nextImages = images.map((image, i) =>                                                                                                                                                                      
      i === index ? { ...image, isSelected: !image.isSelected } : image                                                                                                                                              
    );                                                                                                                                                                                                               
    setImages(nextImages);                                                                                                                                                                                           
  };                                                                                                                                                                                                                 
                                                                                                                                                                                                                     
  const handleSelectAllClick = () => {                                                                                                                                                                               
    const nextImages = images.map((image) => ({                                                                                                                                                                      
      ...image,                                                                                                                                                                                                      
      isSelected: !hasSelected,                                                                                                                                                                                      
    }));                                                                                                                                                                                                             
    setImages(nextImages);                                                                                                                                                                                           
  };                                                                                                                                                                                                                 
                                                                                                                                                                                                                     
  return (                                                                                                                                                                                                           
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="shadow appearance-none border rounded w-2/3 py-3 px-4 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline flex-grow"
        />
        <button
          onClick={fetchImages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Images
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleSelectAllClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {hasSelected ? "Clear selection" : "Select all"}
        </button>
        <button
          onClick={onImageSelected}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Selected
        </button>
      </div>
      {images.length > 0 && (                                                                                                                                                                                        
         <Gallery                                                                                                                                                                                                     
           images={images}                                                                                                                                                                                            
           onSelect={handleSelect}                                                                                                                                                                                    
           thumbnailImageComponent={CustomThumbnail}                                                                                                                                                                  
         />                                                                                                                                                                                                           
       )}  
    </div>                                                                                                                                                                                                         
  );                                                                                                                                                                                                                 
}                                                                                                                                                                                                                    
                                                                                                                                                                                                                     
export default ImageSelection; 
