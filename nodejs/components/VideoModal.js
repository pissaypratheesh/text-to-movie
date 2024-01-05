import React, { useState, useMemo } from "react";
import YouTubePlayer from "./YouTubePlayer";
import TimingsInput from "./TimingsInput";
import TranscriptSearch from "./TranscriptSearch";
import TranscriptList from "./TranscriptList";
import { useRef } from "react";
import { useStore } from "./StoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
var _ = require("underscore");
_.mixin(require('../mixins'))

const VideoModal = observer(function VideoModal({ showModal, handleClose, selectedVideo, transcript, sentenceObj }) {
  console.log("🚀 ~ file: VideoModal.js:11 ~ VideoModal ~ sentenceObj:", selectedVideo,sentenceObj)
  transcript = transcript || _.at(selectedVideo,'transcript') || [
    {
      text: "chat GPT maybe you've heard of it if you",
      start: 0.799,
      duration: 5.881,
    },
    { text: "haven't then get ready the tech", start: 4.24, duration: 4.12 },
    { text: "billionaire Elon Musk has said", start: 6.68, duration: 4.12 },
    {
      text: "artificial intelligence will one day",
      start: 8.36,
      duration: 5.239,
    },
  ];
  const store = useStore();
  const { sentences } = store;
  const playerRef = useRef(null);
  const [seekTime, setSeekTime] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [timingsText, setTimingsText] = useState(sentenceObj.timingsText || "['1-3', '4-5']");
  const [errorMessage, setErrorMessage] = useState("");
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    playerRef.current = event.target;
    event.target.playVideo();
  };
  const filteredTranscript = useMemo(() => {
    if (!searchKeyword) {
      return transcript;
    }
    return transcript.filter((item) =>
      item.text.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, transcript]);

  const validateTimingsText = () => {
    try {                                                                                                                                                                                                                                           
      const parsedTimings = JSON.parse(timingsText.replace(/'/g, '"'));                                                                                                                                                                                                
      console.log("🚀 ~ file: VideoModal.js:49 ~ validateTimingsText ~ timingsText:", parsedTimings,parsedTimings.every(                                                                                                                            
        (timing) => typeof timing === "string" && /^\d+-\d+$/.test(timing)                                                                                                                                                                          
      ))                                                                                                                                                                                                                                            
      if (                                                                                                                                                                                                                                          
        Array.isArray(parsedTimings) &&                                                                                                                                                                                                             
        parsedTimings.every(                                                                                                                                                                                                                        
          (timing) => typeof timing === "string" && /^\d+-\d+$/.test(timing)                                                                                                                                                                        
        )                                                                                                                                                                                                                                           
      ) {            
        let newSentences = [...store.sentences];
        let selectedVids = toJS(newSentences[sentenceObj.index]['selectedVids'] || []);
        console.log("🚀 ~ file: VideoModal.js:60 ~ validateTimingsText ~ selectedVids:", selectedVids)
        selectedVideo.clips = parsedTimings;
        if(selectedVids.length === 0){
          selectedVids = [selectedVideo]
        }else{
          //find if selectedVideo is already in selectedVids and update it
          let index = -1;
          selectedVids.forEach((vid, i) =>{ if(vid.videoId === selectedVideo.videoId) {index = i}});
          console.log("🚀 ~ file: VideoModal.js:67 ~ validateTimingsText ~ index:", index,selectedVids,selectedVideo)
          if(index != -1)
            selectedVids[index] = selectedVideo;
          else {
            selectedVids.push(selectedVideo)
          }
        }
        newSentences[sentenceObj.index]['selectedVids'] = selectedVids
        store.updateSentences(newSentences)
        setErrorMessage("");                                                                                                                                                                                                                        
      } else {                                                                                                                                                                                                                                      
        console.log("\n\n errror again")                                                                                                                                                                                                            
        setErrorMessage("Invalid format. Please enter timings like ['1-3', '4-5']");                                                                                                                                                                
      }                                                                                                                                                                                                                                             
    } catch (error) {                                                                                                                                                                                                                               
      console.log("🚀 ~ file: VideoModal.js:60 ~ validateTimingsText ~ error:", error)                                                                                                                                                              
      setErrorMessage("Invalid format. Please enter timings like ['1-3', '4-5']");                                                                                                                                                                  
    } 
  };

  const changeTime = (seconds) => {
    playerRef.current.seekTo(seconds);
    playerRef.current.playVideo();
  };


  if (!showModal) {
    return <></>;
  }

  return (
    <div className="fixed mt-8 z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          
        </div>
        <div
          className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:w-3/4 sm:h-3/4 m-auto"
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
                  {selectedVideo && selectedVideo.title || "Selected Video"}
                </h3>
                <div className="mt-2">
                  <div className="mt-2">
                    {selectedVideo && (
                      <>
                        <YouTubePlayer videoId={selectedVideo.videoId} onReady={onReady} />

                        <TimingsInput                                                                                                                                                                                
                           timingsText={timingsText}                                                                                                                                                                  
                           setTimingsText={setTimingsText}                                                                                                                                                            
                           validateTimingsText={validateTimingsText}                                                                                                                                                  
                           errorMessage={errorMessage}                                                                                                                                                                
                         />        
                        <TranscriptSearch                                                                                                                                                                            
                           searchKeyword={searchKeyword}                                                                                                                                                              
                           setSearchKeyword={setSearchKeyword}                                                                                                                                                        
                         />   
                         <TranscriptList                                                                                                                                                                              
                           filteredTranscript={filteredTranscript}                                                                                                                                                    
                           changeTime={changeTime}                                                                                                                                                                    
                         />   
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
    focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
})

export default VideoModal;
