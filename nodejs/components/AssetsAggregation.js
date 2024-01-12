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
import VideoLightbox from "./SingleVideo";
import Editor from '@monaco-editor/react';
import axios from "axios";
import { formatXml, fetchXML, uploadFile, burnXML } from '../utils/index';  
import io from 'socket.io-client';
import { ProgressBar } from 'react-bootstrap';

var _ = require("underscore");
let socket; 


const AssetsAggregation = observer(function AssetsAggregation() {
  const editorRef = useRef(null);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [ttsURL, setTTSURL] = useState(null);
  const [isFetchingXML, setIsFetchingXML] = useState(false);
  const [isBurningXML, setIsBurningXML] = useState(false);
  const [editorSize , setEditorSize] = useState(55);
  const store = useStore();
  let { sentences, videodata } = store;
  let { xmlgen, finalVid } = videodata || {};
  sentences = toJS((sentences) || []);

  //console.log("🚀 ~ file: AssetsAggregation.js:20 ~ sentences:", JSON.stringify(toJS(videodata)),"\n\n\n\nSentences-->",sentences.map && JSON.stringify(sentences.map((item)=>{return _.omit(item,'words')})));


  const onDrop = (function(acceptedFiles, others, event){ //useCallback
    acceptedFiles.forEach((file) => {
      uploadFile(file,others, store);
    });
  }); //, []


  const [progress, setProgress] = useState(0);
  console.log("🚀 ~ file: AssetsAggregation.js:47 ~ AssetsAggregation ~ progress:", progress)

  useEffect(() => {
    socket = io('http://localhost:9999');
    socket.on('progress', (data) => {
      console.log("🚀 ~ file: AssetsAggregation.js:51 ~ socket.on ~ data:", data)
      setProgress(data.progress);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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
      {!xmlgen && (
        <button
          id="xmlgen"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg m-4"
          onClick={async () => {
            await fetchXML(store);
          }}
        >
          Fetch XML
        </button>
      )}

      {isFetchingXML && <div>Loading...</div>}


      {xmlgen && (
        <div className="w-full h-64 editor-container" style={{height:`${editorSize}vh`}}>
          <div className="flex items-center" >
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg m-4"
              onClick={() => {
                if (editorRef.current) {
                  const editorInstance = editorRef.current;
                  const xmlgen = editorInstance.getValue();
                  let { videodata } = store;
                  store.updateData({ ...videodata, xmlgen: xmlgen }, 'videodata');
                }
              }}
            >
              Update XML
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg m-4"
              onClick={() => {
                editorSize === 90 ? setEditorSize(55) : setEditorSize(90)
              }}
            >
              Expand Editor
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg m-4"
              id="burnxml"
              onClick={async () => {
                setIsBurningXML(true);
                console.log("Update XML button clicked");
                let { videodata } = store;
                if(videodata.xmlgen){
                  
                  const headers = {
                    'Content-Type': 'application/json',
                  };
                  const data = {
                      xml: videodata.xmlgen,
                  };
                   

                  socket.emit('burn', data);
                }
                setIsBurningXML(false);
  
              }}
            >
              Burn XML
            </button>
            {progress && (
              <ProgressBar
                id="burnspiner"
                className="ml-2"
                now={progress}
                label={`${progress}%`}
                striped
                variant="info"
              />
            )}
            {!isBurningXML && finalVid && finalVid.output && <VideoLightbox videoUrl={finalVid.output} />}
          </div>
          <Editor
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            height="85%"
            defaultLanguage="xml"
            theme="vs-dark"
            value={formatXml(xmlgen)}
            language="xml"
            options={{
              readOnly: false,
              wordWrap: 'on',
              automaticLayout: true,
              formatOnPaste: true,
              formatOnType: true,
              formatOnSave: true,
            }}
          />
        </div>
      )}
      {!isLoading && showAudioModal && <AudioModal ttsURL={ttsURL} toggleAudioModal={() => setShowAudioModal(false)} />}
      {!isLoading && (
          <div key={!!xmlgen} className="border border-gray-300 rounded-lg p-4 mt-9">
            {sentences.map((sentenceObj, index) => {
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
            </div>
      )
      }
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
