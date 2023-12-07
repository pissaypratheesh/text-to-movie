import React, { useState } from 'react';
import Gallery from 'react-grid-gallery';
import YouTube from 'react-youtube';

const videos = [
  "https://www.youtube.com/shorts/Od5Xvu-PFYQ",
  // Add more video URLs here
];

function createGalleryItems(videos, onSelect) {
  return videos.map((videoUrl, index) => {
    const videoId = videoUrl.split('/').pop();
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    return {
      src: videoUrl,
      thumbnail: thumbnailUrl,
      thumbnailWidth: 320,
      thumbnailHeight: 180,
      customOverlay: (
        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <button onClick={() => onSelect(videoUrl)}>Select</button>
        </div>
      ),
    };
  });
}

function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl);
    // Make a call to send the selected video
  };

  const galleryItems = createGalleryItems(videos, handleVideoSelect);

  return (
    <div>
      <Gallery images={galleryItems} enableImageSelection={false} />
      {selectedVideo && (
        <div>
          <h2>Selected Video:</h2>
          <YouTube videoId={selectedVideo.split('/').pop()} />
        </div>
      )}
    </div>
  );
}

export default Videos;
