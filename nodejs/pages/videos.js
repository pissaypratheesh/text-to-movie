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
          <button
            onClick={handleSelectClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Select
          </button>
          <button
            onClick={handlePlayClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Play
          </button>
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
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={handleClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Video Player
                    </h3>
                    <div className="mt-2">
                      <div className="mt-2">
                        {selectedVideo && (
                          <YouTube videoId={selectedVideo.split('/').pop()} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
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
