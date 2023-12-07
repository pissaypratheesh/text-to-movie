import React, { useState } from 'react';
import Gallery from 'react-grid-gallery';
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
