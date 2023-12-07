import React, { useState } from 'react';
import ImageSelection from '../components/ImageSelection';
import VideoSelection from '../components/VideoSelection';

function HomePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query') || '';

  return (
    <div>
      <ImageSelection query={query} />
      <VideoSelection query={query} />
    </div>
  );
}

export default HomePage;
//
