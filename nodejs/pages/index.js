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
  
  if(!query){
    return <div> add query</div>
  }
  return (
    <div className="m-4">
      <ImageSelection q={query} />
      <VideoSelection q={query} />
    </div>
  );
}

export default HomePage;
//
