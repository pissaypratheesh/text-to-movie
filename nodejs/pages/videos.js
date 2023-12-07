import React, { useState, useCallback } from 'react';
import {Gallery} from 'react-grid-gallery';
import YouTube from 'react-youtube';

const videos = [
  {
    "title": "😌Tweet Reels😜❤️ #shorts #tweetreels #aesthetic #faketweet #funny #memes #viral #reels #youtube",
    "thumbnail": {
      "thumbnails": [
        {
          "url": "https://i.ytimg.com/vi/Od5Xvu-PFYQ/hq720_2.jpg?sqp=-oaymwE9COgCEMoBSFryq4qpAy8IARUAAAAAGAAlAADIQj0AgKJDeAHwAQH4Ac4FgAKACooCDAgAEAEYQSBLKGUwDw==&rs=AOn4CLDHBq5VinmLkomI9ZW9pssjyDgsmQ",
          "width": 360,
          "height": 202
        },
        {
          "url": "https://i.ytimg.com/vi/Od5Xvu-PFYQ/hq720_2.jpg?sqp=-oaymwExCNAFEJQDSFryq4qpAyMIARUAAIhCGADwAQH4Ac4FgAKACooCDAgAEAEYQSBLKGUwDw==&rs=AOn4CLDo7SQoEVBNtJ3dRetnKxzn1_ItGw",
          "width": 720,
          "height": 404
        }
      ]
    },
    "videoId": "Od5Xvu-PFYQ",
    "link": "https://www.youtube.com/shorts/Od5Xvu-PFYQ"
  },
  // Add more video objects here
];

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
