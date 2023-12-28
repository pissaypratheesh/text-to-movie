import React, { useEffect, useState } from "react";
import ImageSelection from "./ImageSelection";
import VideoSelection from "./VideoSelection";
import { useStore } from "./StoreProvider";
import { observer } from "mobx-react-lite";

var _ = require("underscore");

const AssetsAggregation = observer(function AssetsAggregation() {
  const [query, setQuery] = useState("");
  const store = useStore();
  const { sentences } = store;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const urlQuery =
      urlParams.get("q") ||
      urlParams.get("query") ||
      urlParams.get("prompt") ||
      urlParams.get("p");
    console.log(
      "🚀 ~ file: index.js:112 ~ useEffect ~ urlQuery:",
      urlQuery,
      window.location.search,
      urlParams
    );
    setQuery(urlQuery);
  }, []);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [selectedVideos, setSelectedVideos] = useState({});
  console.log(
    "🚀 ~ file: index.js:22 ~ HomePage ~ selectedImages:",
    selectedImages,
    selectedVideos,
    `${selectedImages.length}_${Object.values(selectedVideos)
      .map((videos) => videos.length)
      .join(",")}`
  );

  if (!sentences.length) {
    return <div> add query</div>;
  }

  return (
    <div className="m-4">
      <h2 className="text-2xl font-semibold mb-4">
        Selected Images and Videos
      </h2>
      <div
        className="grid grid-cols-3 gap-4 mb-8"
        key={`${selectedImages.length}_${Object.values(selectedVideos)
          .map((videos) => videos.length)
          .join(",")}`}
      >
        {Object.values(selectedImages).map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt="Selected"
            className="w-full h-32 object-cover"
          />
        ))}
        {Object.values(selectedVideos).map((videos, index) => {
          return Object.values(videos).map((video, i) => {
            return (
              <img
                key={index}
                src={video.src}
                controls
                className="w-full h-32 object-cover"
              />
            );
          });
        })}
      </div>
      {sentences.map((sentenceObj, index) => {
        let { line: sentence } = sentenceObj;
        return (
          <details key={index} className="mb-4">
            <summary
              className="cursor-pointer text-xl font-semibold"
              onClick={() => setSelectedSentence(sentence)}
            >
              {sentence}
            </summary>
          </details>
        );
      })}
      )}
      {selectedSentence && (
        <div className="mt-4">
          <ImageSelection
            q={selectedSentence}
            selectedImage={selectedImages.find(
              (img) => img.q === selectedSentence
            )}
            onImageSelect={(image, sentence) => {
              if (Array.isArray(image)) {
                if (!image.length) {
                  setSelectedImages((prevSelectedImages) => {
                    const newSelectedImages = _.compact(
                      prevSelectedImages.map((img) => {
                        return img.q != sentence ? img : null;
                      })
                    );
                    return newSelectedImages;
                  });
                  return;
                }

                setSelectedImages((prevSelectedImages) => {
                  const newSelectedImages = [...prevSelectedImages];
                  image.forEach((img) => {
                    newSelectedImages[newSelectedImages.length] = img;
                  });
                  return newSelectedImages;
                });
              } else {
                console.log(
                  "🚀 ~ file: index.js:70 ~ HomePage ~ image:",
                  image
                );
                if (image.isSelected) {
                  setSelectedImages([...selectedImages, image]);
                } else {
                  setSelectedImages((prevSelectedImages) => {
                    const newSelectedImages = _.compact(
                      prevSelectedImages.map((img) => {
                        return img.q == sentence && img.src == image.src
                          ? null
                          : img;
                      })
                    );
                    return newSelectedImages;
                  });
                }
              }
            }}
          />
          <VideoSelection
            q={selectedSentence}
            selectedVideo={selectedVideos[selectedSentence]}
            onVideoSelect={(video, sentence) => {
              if (Array.isArray(video)) {
                setSelectedVideos((prevSelectedVideosOrig) => {
                  let prevSelectedVideos = { ...prevSelectedVideosOrig };
                  console.log(
                    "🚀 ~ file: index.js:89 ~ setSelectedVideos ~ prevSelectedVideos:",
                    prevSelectedVideos
                  );
                  prevSelectedVideos[sentence] = video;
                  return prevSelectedVideos;
                });
              } else {
                setSelectedVideos([...selectedVideos, video]);
              }
            }}
          />
        </div>
      )}
    </div>
  );
});

export default AssetsAggregation;
//
