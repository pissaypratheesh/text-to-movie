import React, { useEffect, useState } from 'react';
import Gallery from 'react-grid-gallery';

function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/fetch/bingimages?query=coronavirus')
      .then(response => response.json())
      .then(data => setImages(data.images));
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
