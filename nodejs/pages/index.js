import React, { useEffect, useState } from 'react';
import ImageSelection from '../components/ImageSelection';
import VideoSelection from '../components/VideoSelection';

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

  const sentences = query.split('.').filter(sentence => sentence.trim().length > 0);

  if (!sentences.length) {
    return <div> add query</div>
  }

  return (
    <div className="m-4">
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
