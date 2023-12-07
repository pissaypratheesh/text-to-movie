import React, { useState, useCallback, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
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
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/fetchshorts?query=elephant%20and%20turtle')
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, [query]);

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
      setShowModal(true);
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

  const handleSearchClick = () => {
    fetch(`http://localhost:3000/api/fetchshorts?query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => setVideos(data));
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVideo && <YouTube videoId={selectedVideo.split('/').pop()} />}
        </Modal.Body>
      </Modal>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <Gallery
        images={galleryItems}
        enableImageSelection={false}
        thumbnailImageComponent={CustomThumbnail}
      />
    </div>
  );
}

export default Videos;
