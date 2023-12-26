import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lightbox from 'react-18-image-lightbox';
import { Gallery } from 'react-grid-gallery';

const ImageCreator = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log("🚀 ~ file: ImageCreator.js:8 ~ ImageCreator ~ images:", images)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(location.search);
      const prompt = params.get('prompt') || params.get('query') || params.get('q');
      if (prompt) {
        setText(prompt);
      }
    }
  }, []);


  const createImage = async () => {                                                                                                                                                                                                               
    setLoading(true);                                                                                                                                                                                                                           
    try {                                                                                                                                                                                                                                       
      const response = await axios.get(`http://localhost:8081/api/create_img?prompt=${text}`);                                                                                                                                                  
      setImages(response.data);                                                                                                                                                                                                                 
      console.log("🚀 ~ file: ImageCreator.js:27 ~ createImage ~ response:", response)
    } catch (error) {                                                                                                                                                                                                                           
      console.error(error);                                                                                                                                                                                                                     
      console.log("🚀 ~ file: ImageCreator.js:30 ~ createImage ~ error:", error && error.toString())
    }                                                                                                                                                                                                                                           
    setLoading(false);                                                                                                                                                                                                                          
  };   

  return (
    <div className="p-4">
      <input
        type="text"
        className="border-2 border-gray-300 p-2 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={createImage}
      >
        Create Image
      </button>
      {loading ? (                                                                                                                                                                                                                                    
         <p>Loading...</p>                                                                                                                                                                                                                       
       ) : (      
        <>                                                                                                                                                                                                                               
            <Gallery                                                                                                                                                                                                                                        
                images={images.map((image, index) => ({                                                                                                                                                                                                       
                src: image,                                                                                                                                                                                                                                 
                thumbnail: image,                                                                                                                                                                                                                           
                thumbnailWidth: 320,                                                                                                                                                                                                                        
                thumbnailHeight: 212,                                                                                                                                                                                                                       
                isSelected: selectedImage === index,                                                                                                                                                                                                        
                caption: `Image ${index + 1}`                                                                                                                                                                                                               
                }))}                                                                                                                                                                                                                                          
                onSelectImage={index => setSelectedImage(index)}                                                                                                                                                                                              
            />                                                                                                                                                                                                                                              
            {selectedImage !== null && (                                                                                                                                                                                                                    
                <Lightbox images={[images[selectedImage]]} />                                                                                                                                                                                                 
            )} 
        </>                                                                                                                                                                                                                                  
       )} 
    </div>
  );
};

export default ImageCreator;
