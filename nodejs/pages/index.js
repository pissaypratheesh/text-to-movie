import React, { useEffect, useState } from 'react';
import Gallery from 'react-grid-gallery';

function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/fetchImages')
      .then(response => response.json())
      .then(data => setImages(data.images));
  }, []);

  const onSelectImage = (index, image) => {
    const imagesCopy = images.slice();
    const img = imagesCopy[index];
    if (img.hasOwnProperty('isSelected')) {
      img.isSelected = !img.isSelected;
    } else {
      img.isSelected = true;
    }

    setImages(imagesCopy);
  }

  return (
    <div>
      <Gallery
        images={images}
        onSelectImage={onSelectImage}
      />
      <button onClick={() => fetch('/api/updateSelectedImages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedImages: images.filter(img => img.isSelected),
        }),
      })}>
        Update Selected Images
      </button>
    </div>
  );
}

export default HomePage;
