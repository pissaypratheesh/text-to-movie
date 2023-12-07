import React, { useEffect, useState } from 'react';                                                                                                                                                                  
import axios from 'axios';                                                                                                                                                                                           
import { Gallery } from "react-grid-gallery";                                                                                                                                                                        
                                                                                                                                                                                                                     
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
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-4 p-2 rounded border border-gray-300"
      />
      <button
        onClick={fetchImages}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Fetch Images
      </button>
      <button
        onClick={handleSelectAllClick}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
      >
        {hasSelected ? "Clear selection" : "Select all"}
      </button>
      <button
        onClick={onImageSelected}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
      >
        Update Selected
      </button>
      {images.length > 0 && (
        <Gallery images={images} onSelect={handleSelect} />
      )}
    </div>                                                                                                                                                                                                         
  );                                                                                                                                                                                                                 
}                                                                                                                                                                                                                    
                                                                                                                                                                                                                     
export default ImageSelection; 