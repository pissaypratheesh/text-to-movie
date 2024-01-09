import React, { useEffect, useState, useCallback, useRef } from "react";
import ImageSelection from "./ImageSelection";
import VideoSelection from "./VideoSelection";
import { useStore } from "./StoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import AudioPlayer from "./AudioPlayer";
import Loading from "./Loading";
import AudioModal from "./AudioModal";
import Editor from '@monaco-editor/react';


import axios from "axios";
var activeFile = 9999;
var _ = require("underscore");

const AssetsAggregation = observer(function AssetsAggregation() {
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [xmlCode, setXmlCode] = useState(null);
  const [ttsURL, setTTSURL] = useState(null);
  const [isFetchingXML, setIsFetchingXML] = useState(false);

  const fetchXML = async () => {
    setIsFetchingXML(true);
    try {
      let sentences = toJS(store.sentences || []);
      const response = await axios.post('http://localhost:3000/api/xmlgen', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          data: sentences.map((item)=>{return _.omit(item,'words')}),
        },
      });

      if (response.data) {
        setXmlCode(response.data.xmlgen);
      } else {
        console.error('Error fetching XML');
      }
    } catch (error) {
      console.error('Error fetching XML:', error);
    } finally {
      setIsFetchingXML(false);
    }
  };
  const store = useStore();
  let { sentences, videodata } = store;
  sentences = toJS((sentences) || []);
  console.log("🚀 ~ file: AssetsAggregation.js:20 ~ sentences:", JSON.stringify(toJS(videodata)),"\n\n\n\nSentences-->",sentences.map && JSON.stringify(sentences.map((item)=>{return _.omit(item,'words')})));
  const uploadFile = async (file, others) => {
  
    // Replace this URL with your backend API endpoint
    const apiUrl = "/api/upload";
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(apiUrl, formData);
      let newSentences = [...store.sentences];
      //let newImageArr =        newSentences[selectedSentence.index]["selectedImgs"] || [];
      console.log(
        "File uploaded successfully",
        others,
        response,
        newSentences
      );

      if (response.data && response.data.files) {
        let meta = toJS(others);
        let activeIndex = meta && meta.index;
        let files = response.data.files || [];
        let newImageArr = newSentences[activeIndex]["selectedImgs"] || [];
        let newVideoArr = newSentences[activeIndex]["selectedVids"] || [];
        files.forEach((filedetails)=>{
          let { type, url } = filedetails;
          if (type == "image") {
            newImageArr[newImageArr.length] = { src: url, link: url, url, index: newImageArr.length };
          }
          if(type == "video"){
            newVideoArr[newVideoArr.length] = { src: url, link: url, url, index: newVideoArr.length };
          }
        })
        newSentences[activeIndex]["selectedImgs"] = newImageArr;
        newSentences[activeIndex]["selectedVids"] = newVideoArr;
        console.log("🚀 ~ file: AssetsAggregation.js:42 ~ uploadFile ~ activeIndex:", activeIndex,newSentences)

        store.updateSentences(newSentences);

      } else {
        console.error("Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onDrop = (function(acceptedFiles, others, event){ //useCallback
    acceptedFiles.forEach((file) => {
      uploadFile(file,others);
    });
  }); //, []


  if (!(sentences && sentences.length)) {
    return <div> add query</div>;
  }

  return (
    <div className="m-4">
      {isLoading && <Loading text={"Fetching the TTS with segments"}/>}
      <div className="flex justify-start items-center space-x-4 mt-4">
        <AudioPlayer onAudioReceived={(url) => { setTTSURL(url); setIsLoading(false); }} />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowAudioModal(!showAudioModal)}
        >
          {showAudioModal ? "Close Audio Modal" : "Open Audio Modal"}
        </button>
      </div>
      {!xmlCode && (
        <button
          id="xmlgen"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg m-4"
          onClick={async () => {
            await fetchXML();
          }}
        >
          Fetch XML
        </button>
      )}

      {isFetchingXML && <div>Loading...</div>}

      {xmlCode && (
        <div className="w-full h-64">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            onClick={() => {
              console.log("Update XML button clicked");
            }}
          >
            Update XML
          </button>
          <Editor
            height="100%"
            defaultLanguage="xml"
            defaultValue={xmlCode}
            language="xml"
            options={{
              readOnly: false,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </div>
      )}
      {!isLoading && showAudioModal && <AudioModal ttsURL={ttsURL} toggleAudioModal={() => setShowAudioModal(false)} />}
      {!isLoading && sentences.map((sentenceObj, index) => {
        let { line: sentence, start, end, assetsEnd } = sentenceObj;
        let selectedImgs = toJS(sentenceObj.selectedImgs || []);
        let selectedVids = toJS(sentenceObj.selectedVids || []);
        let isBothEmpty =
          selectedImgs.length === 0 && selectedVids.length === 0;
        return (
          <details key={index} className="mb-4">
            <summary
              className="cursor-pointer text-xl font-semibold"
              onClick={() => {
                console.log(
                  "\n\n\nclick for symmary of sentence",
                  index,
                  toJS(sentenceObj)
                );
                setSelectedSentence(toJS(sentenceObj));
              }}
            >
              {`(${((assetsEnd || end) - start).toFixed(1)}s)${sentence}`}
            </summary>
            {
              <>
                {!isBothEmpty && (
                  <>
                    {
                      <h2 className="text-2xl font-semibold mb-4">
                        Selected Images and Videos
                      </h2>
                    }
                    <div
                      className="grid grid-cols-4 gap-4 mb-8"
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
                        if(video.link && video.link.indexOf('tube.com')!==-1){
                          return (
                            <div>
                              <div>{`${video.title.slice(0, 25)}..` || ''}</div>
                              <img
                                  key={index}
                                  src={video.src}
                                  alt="Selected"
                                  className="w-full h-32 object-cover"
                                />
                            </div>
                          )
                        }
                        console.log("🚀 ~ file: AssetsAggregation.js:133 ~ {Object.values ~ video:", video)
                        return (
                          <video
                            key={index}
                            src={video.src}
                            controls
                            className="w-full h-32 object-cover"
                          />
                        );
                      })}
                    </div>
                  </>
                )}
                <Dropzone  
                  onDrop={(acceptedFiles) => {
                    onDrop(acceptedFiles, sentenceObj);
                  }} 
                  accept="image/*,video/*" 
                  multiple={true}>
                    {({getRootProps, getInputProps}) => (
                      <div {...getRootProps({className: 'className="border-dashed border-2 border-gray-400 p-4 cursor-pointer'})}>
                          <input {...getInputProps()} />
                          <span >
                                Drop hero image here, or click to select file
                          </span>
                      </div>
                    )}
                </Dropzone>
              </>
            }
          </details>
        );
      })}
      {!isLoading && selectedSentence && (
        <div className="mt-4" key={selectedSentence.index}>
          <ImageSelection
            q={selectedSentence.line}
            sentenceObj={selectedSentence}
            onImageSelect={(image, sentence, sentenceObj) => {
              let newSentences = [...store.sentences];
              let newImageArr =
                newSentences[sentenceObj.index]["selectedImgs"] || [];

              //selectAll or deselct all
              if (Array.isArray(image)) {
                if (!image.length) {
                  newImageArr = [];
                } else {
                  newImageArr = image;
                }
              } else {
                // select/deselect single
                if (image.isSelected) {
                  newImageArr[newImageArr.length] = image;
                } else {
                  newImageArr = newImageArr.filter(
                    (img) => img.src != image.src
                  );
                }
              }
              //Update store
              newSentences[sentenceObj.index]["selectedImgs"] = newImageArr;
              store.updateSentences(newSentences);
            }}
          />
          <VideoSelection
            q={selectedSentence.line}
            sentenceObj={selectedSentence}
            onVideoSelect={(video, sentence, sentenceObj) => {
              let newSentences = [...store.sentences];
              if (video && Array.isArray(video)) {
                video = video.map((v, i) => {
                  return { ...v, index: i };
                });
              }
              //let newVidArr = newSentences[sentenceObj.index]['selectedVids'] || [];
              newSentences[sentenceObj.index]["selectedVids"] = video;
              store.updateSentences(newSentences);
            }}
          />
        </div>
      )}
    

  </div>
);
});


export default AssetsAggregation;
