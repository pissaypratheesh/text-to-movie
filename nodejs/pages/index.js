import React, { useState } from 'react';
import axios from 'axios';
import Gallery from 'react-grid-gallery';

function HomePage() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  const fetchImages = async () => {
    try {
      const response = await axios.get(`/api/fetch/bingimages?query=${query}`);
      setImages(response.data.images);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const onSelectImage = async (index, image) => {
    const imagesCopy = images.slice();
    const img = imagesCopy && imagesCopy[index];
    if (img.hasOwnProperty('isSelected')) {
      img.isSelected = !img.isSelected;
    } else {
      img.isSelected = true;
    }

    setImages(imagesCopy);

    try {
      await axios.post('/api/updateSelectedImages', {
        selectedImages: images.filter(img => img.isSelected),
      });
    } catch (error) {
      console.error('Failed to update selected images:', error);
    }
  }

  return (
    <div>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={fetchImages}>Fetch Images</button>
      {images.length > 0 && (
        <Gallery
          images={images}
          onSelectImage={onSelectImage}
        />
      )}
    </div>
  );
}

export default HomePage;
