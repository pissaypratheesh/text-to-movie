import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from 'react-grid-gallery';

function HomePage() {
  const [images, setImages] = useState([]);
  console.log("🚀 ~ file: index.js:7 ~ HomePage ~ images:", images)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/fetch/bingimages?query=coronavirus');
        setImages(response.data.images);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  const onSelectImage = (index, image) => {
    const imagesCopy = images.slice();
    const img = imagesCopy && imagesCopy[index];
    if (img.hasOwnProperty('isSelected')) {
      img.isSelected = !img.isSelected;
    } else {
      img.isSelected = true;
    }

    setImages(imagesCopy);
  }

  if(!images || images.length == 0){
    return <div>Loading..</div>
  }
  return (
    <div>
      <Gallery
        images={images}
        onSelectImage={onSelectImage}
      />
      <button onClick={async () => {
        try {
          await axios.post('/api/updateSelectedImages', {
            selectedImages: images.filter(img => img.isSelected),
          });
        } catch (error) {
          console.error('Failed to update selected images:', error);
        }
      }}>
        Update Selected Images
      </button>
    </div>
  );
}

export default HomePage;
