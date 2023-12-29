import React, { useEffect, useState } from "react";
import ImageSelection from "./ImageSelection";
import VideoSelection from "./VideoSelection";
import { useStore } from "./StoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useDropzone } from "react-dropzone";

var _ = require("underscore");

const AssetsAggregation = observer(function AssetsAggregation() {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the file upload here
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [query, setQuery] = useState("");
  const store = useStore();
  const { sentences } = store;
  console.log("🚀 ~ file: AssetsAggregation.js:13 ~ AssetsAggregation ~ sentences:", toJS(sentences))

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const urlQuery =
      urlParams.get("q") ||
      urlParams.get("query") ||
      urlParams.get("prompt") ||
      urlParams.get("p");
    setQuery(urlQuery);
  }, []);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [selectedVideos, setSelectedVideos] = useState({});

  if (!sentences.length) {
    return <div> add query</div>;
  }

  return (
    <div className="m-4">

      {sentences.map((sentenceObj, index) => {
        let { line: sentence } = sentenceObj;
        let selectedImgs = toJS(sentenceObj.selectedImgs || []);
        let selectedVids =  toJS(sentenceObj.selectedVids || []);
        let isBothEmpty = selectedImgs.length === 0 && selectedVids.length === 0;
        return (
          <details key={index} className="mb-4">
            <summary
              className="cursor-pointer text-xl font-semibold"
              onClick={() => setSelectedSentence(sentenceObj)}
            >
              {sentence}
            </summary>
            {!isBothEmpty && (
                <>
                        {(<h2 className="text-2xl font-semibold mb-4">
                            Selected Images and Videos
                        </h2>)}
                        <div
                            className="grid grid-cols-3 gap-4 mb-8"
                            key={`${selectedImgs.length}_${selectedVids.length}`}
                        >
                            {Object.values(selectedImgs).map((image, index) => (
                                <img
                                    key={index}
                                    src={image.src}
                                    alt="Selected"
                                    className="w-full h-32 object-cover"
                                />
                            ))}
                            {Object.values(selectedVids).map((video, index) => {
                                    return (
                                    <img
                                        key={index}
                                        src={video.src}
                                        controls
                                        className="w-full h-32 object-cover"
                                    />
                                    );
                            })}
                            <div {...getRootProps()} className="border-dashed border-2 border-gray-400 p-4 cursor-pointer">
                              <input {...getInputProps()} />
                              {
                                isDragActive ?
                                  <p>Drop the files here ...</p> :
                                  <p>Click or drag a file to upload</p>
                              }
                            </div>
                        </div>
                </>
            )}
          </details>
        );
      })}
      {selectedSentence && (
        <div className="mt-4" key={selectedSentence.index}>
          <ImageSelection
            q={selectedSentence.line}
            sentenceObj={selectedSentence}
            onImageSelect={(image, sentence, sentenceObj) => {
              let newSentences = [...store.sentences];
              let newImageArr = newSentences[sentenceObj.index]['selectedImgs'] || [];
      
              //selectAll or deselct all    
              if (Array.isArray(image)) {
                if (!image.length) {
                  newImageArr = [];
                }else{
                    newImageArr = image;
                }
              } else {
                // select/deselect single
                if (image.isSelected) {
                    newImageArr[newImageArr.length] = image;
                } else {
                    newImageArr = newImageArr.filter(img => img.src != image.src)
                }
              }
              //Update store
              newSentences[sentenceObj.index]['selectedImgs'] = newImageArr;
              store.updateSentences(newSentences)
            }}
          />
          <VideoSelection
            q={selectedSentence.line}
            sentenceObj={selectedSentence}
            onVideoSelect={(video, sentence, sentenceObj) => {
                let newSentences = [...store.sentences];
                //let newVidArr = newSentences[sentenceObj.index]['selectedVids'] || [];
                newSentences[sentenceObj.index]['selectedVids'] = video;
                store.updateSentences(newSentences)
            }}
          />
        </div>
      )}
    </div>
  );
});

export default AssetsAggregation;
//
