import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import Gallery from 'react-grid-gallery';
import { Gallery } from "react-grid-gallery";

function HomePage() {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState([{
    src: "https://player.vimeo.com/video/207276482?title=0&portrait=0&byline=0&autoplay=1&muted=true",
    height:1080,
    width:1920,
  }]);
  const [query, setQuery] = useState('elephant');
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
   //fetchImages() 
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

const handleNextStep = () => {
  setStep(step + 1);
};

return (
  <div>
    {step === 0 && (
      <>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchImages}>Fetch Images</button>
        <button onClick={handleSelectAllClick}>
          {hasSelected ? "Clear selection" : "Select all"}
        </button>
        <button onClick={onImageSelected}>Update Selected</button>
        {images.length > 0 && (
          <Gallery images={images} onSelect={handleSelect} />
        )}
        <button onClick={handleNextStep}>Next</button>
      </>
    )}
    {step === 1 && <Videos />}
  </div>
);
}

export default HomePage;
//
