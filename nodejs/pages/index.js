import React, { useEffect, useState } from 'react';
import ImageSelection from '../components/ImageSelection';
import VideoSelection from '../components/VideoSelection';
var _ = require('underscore')
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
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  console.log("🚀 ~ file: index.js:22 ~ HomePage ~ selectedImages:", selectedImages,selectedVideos)


  if (!sentences.length) {
    return <div> add query</div>
  }

  return (
    <div className="m-4">
      <h2 className="text-2xl font-semibold mb-4">Selected Images and Videos</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Object.values(selectedImages).map((image, index) => (
          <img key={index} src={image.src} alt="Selected" className="w-full h-32 object-cover" />
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
              onImageSelect={(image, sentence) => {
                if (Array.isArray(image)) {
                  if(!image.length) {
                    setSelectedImages((prevSelectedImages) => {
                      const newSelectedImages = _.compact(prevSelectedImages.map((img) => {
                        return img.q != sentence ? img : null
                      }));
                      return newSelectedImages;
                    });
                    return;
                  }

                  setSelectedImages((prevSelectedImages) => {
                    const newSelectedImages = [ ...prevSelectedImages ];
                    image.forEach((img) => {
                      newSelectedImages[newSelectedImages.length] = img;
                    });
                    return newSelectedImages;
                  });
                } else {
                  console.log("🚀 ~ file: index.js:70 ~ HomePage ~ image:", image)
                  if(image.isSelected){
                    setSelectedImages([ ...selectedImages,  image ]);
                  }else{
                    setSelectedImages((prevSelectedImages) => {
                      const newSelectedImages = _.compact(prevSelectedImages.map((img) => {
                        return img.q == sentence && img.src == image.src  ? null : img
                      }));
                      return newSelectedImages;
                    });
                  }
                }
              }}
            />
            <VideoSelection
              q={sentence}
              selectedVideo={selectedVideos[index]}
              onVideoSelect={(video, sentence) => {
                if (Array.isArray(video)) {
                  if(!image.length) {
                    setSelectedImages((prevSelectedImages) => {
                      const newSelectedImages = _.compact(prevSelectedImages.map((img) => {
                        return img.q != sentence ? img : null
                      }));
                      return newSelectedImages;
                    });
                    return;
                  }

                  setSelectedVideos((prevSelectedVideos) => {
                    const newSelectedVideos = [ ...prevSelectedVideos ];
                    video.forEach((vid) => {
                      newSelectedVideos[(newSelectedVideos).length] = vid;
                    });
                    return newSelectedVideos;
                  });
                } else {
                  setSelectedVideos([ ...selectedVideos,  video ]);
                }
              }}
            />
          </div>
        </details>
      ))}
    </div>
  );
}

export default HomePage;
//
