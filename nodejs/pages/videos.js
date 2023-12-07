import React, { useState, useCallback, useEffect } from 'react';
import {Gallery} from 'react-grid-gallery';
import YouTube from 'react-youtube';


function createGalleryItems(videos, onSelect) {
  return videos.map((videoUrl, index) => {
    const videoId = videoUrl.videoId;
    const thumbnailUrl = videoUrl.thumbnail.thumbnails[0].url;

    return {
      src: thumbnailUrl,
      thumbnail: thumbnailUrl,
      thumbnailWidth: 320,
      thumbnailHeight: 180,
      videoId,
    };
  });
}

function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/fetchshorts?query=elephant%20and%20turtle')
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);

  console.log("🚀 ~ file: videos.js:49 ~ Videos ~ selectedVideo:", selectedVideo)

  const handleVideoSelect = (videoUrl) => {
    console.log("🚀 ~ file: videos.js:51 ~ handleVideoSelect ~ videoUrl:", videoUrl)
    setSelectedVideo(videoUrl);
    // Make a call to send the selected video
  };

  const galleryItems = createGalleryItems(videos, handleVideoSelect);
  console.log("🚀 ~ file: videos.js:56 ~ Videos ~ galleryItems:", galleryItems)

  const CustomThumbnail = useCallback(({ item }) => {
    const handleSelectClick = (e) => {
      e.stopPropagation();
      handleVideoSelect(item.videoId);
    };

    const handlePlayClick = (e) => {
      e.stopPropagation();
      setSelectedVideo(item.videoId);
    };

    return (
      <div>
        <img src={item.thumbnail} alt={item.videoId} />
        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <button onClick={handleSelectClick}>Select</button>
          <button onClick={handlePlayClick}>Play</button>
        </div>
      </div>
    );
  }, [handleVideoSelect, setSelectedVideo]);

  return (
    <div>
      <Gallery
        images={galleryItems}
        enableImageSelection={false}
        thumbnailImageComponent={CustomThumbnail}
      />
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
