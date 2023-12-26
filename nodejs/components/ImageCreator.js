import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lightbox from 'react-18-image-lightbox';
import { useLocation } from 'react-router-dom';

const ImageCreator = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(location.search);
      const prompt = params.get('prompt');
      if (prompt) {
        setText(prompt);
      }
    }
  }, [location]);

  const createImage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create', { text });
      setImages([...images, response.data]);
    } catch (error) {
      console.error(error);
    }
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
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((image, index) => (
          <Lightbox key={index} images={[image]} />
        ))}
      </div>
    </div>
  );
};

export default ImageCreator;
