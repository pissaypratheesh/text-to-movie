import React, { useEffect, useState } from 'react';
import ImageSelection from '../components/ImageSelection';
import VideoSelection from '../components/VideoSelection';
const sentences = [
  "Sun sets, warm city glow.",
  "Forest walk, birds chirp.",
  "Quiet library, books imagination.",
  "Freshly baked bread aroma."
];//query.split('.').filter(sentence => sentence.trim().length > 0);

function HomePage() {
  const [query, setQuery] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);      
                                                                                                                                                 
    const urlQuery = urlParams.get('q') ||  urlParams.get('query') ||  urlParams.get('prompt') ||  urlParams.get('p') ;                                                                                                                                                
    console.log("🚀 ~ file: index.js:112 ~ useEffect ~ urlQuery:", urlQuery,window.location.search,urlParams)
    setQuery(urlQuery);                                             
  },[])
  
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedVideos, setSelectedVideos] = useState({});


  if (!sentences.length) {
    return <div> add query</div>
  }

  return (
    <div className="m-4">
      <h2 className="text-2xl font-semibold mb-4">Selected Images and Videos</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Object.values(selectedImages).map((image, index) => (
          <img key={index} src={image} alt="Selected" className="w-full h-32 object-cover" />
        ))}
        {Object.values(selectedVideos).map((video, index) => (
          <video key={index} src={video} controls className="w-full h-32 object-cover" />
        ))}
      </div>
      {sentences.map((sentence, index) => (
        <details key={index} className="mb-4">
          <summary className="cursor-pointer text-xl font-semibold">{sentence}</summary>
          <div className="mt-4">
            <ImageSelection
              q={sentence}
              selectedImage={selectedImages[index]}
              onImageSelect={image => setSelectedImages({ ...selectedImages, [index]: image })}
            />
            <VideoSelection
              q={sentence}
              selectedVideo={selectedVideos[index]}
              onVideoSelect={video => setSelectedVideos({ ...selectedVideos, [index]: video })}
            />
          </div>
        </details>
      ))}
    </div>
  );
}

export default HomePage;
//
