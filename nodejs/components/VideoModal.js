import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { useRef } from 'react';
//import { FixedSizeList as List } from 'react-window'; 
import { FixedSizeList as List } from 'react-window';
function VideoModal({ showModal, handleClose, selectedVideo }) {
  let transcript = [{"text":"chat GPT maybe you've heard of it if you","start":0.799,"duration":5.881},{"text":"haven't then get ready the tech","start":4.24,"duration":4.12},{"text":"billionaire Elon Musk has said","start":6.68,"duration":4.12},]  
  if(!showModal){
    return <></>
  }                                                                                                                                                                                                                                       
  const playerRef = useRef(null);
  const [seekTime, setSeekTime] = useState(0);
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    playerRef.current = event.target;
    event.target.playVideo();
  };
  const changeTime = (seconds) => {
    playerRef.current.seekTo(seconds);
    playerRef.current.playVideo();
  };

  const Row = ({ index, style }) => {                                                                                                                                                                                                             
    const item = transcript[index];                                                                                                                                                                                                               
    return (                                                                                                                                                                                                                                      
      <button                                                                                                                                                                                                                                     
        onClick={() => {
          // setSeekTime(item.start);
          // player.current.seekTo(item.start);
          changeTime(item.start)
        }}
        className="w-full text-left p-2 hover:bg-gray-200"                                                                                                                                                                                        
        style={style}                                                                                                                                                                                                                             
      >                                                                                                                                                                                                                                           
        {`${item.start}: ${item.text}`}                                                                                                                                                                                                                               
      </button>                                                                                                                                                                                                                                   
    );                                                                                                                                                                                                                                            
  };                                                                                                                                                                                                                                              
           
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
                    Video Player
                  </h3>
                  <div className="mt-2">
                    <div className="mt-2">
                      {selectedVideo && (
                        <>
                          <YouTube 
                            videoId={selectedVideo.split('/').pop()}
                            onReady={onReady} 
                            opts = { { playerVars: {
                              // https://developers.google.com/youtube/player_parameters
                              height: '390',
                              width: '640',
                              autoplay: 1
                            }, } }
                          className="mx-auto"/>
                                                                                                                                                                                                                                                                           
                          <List                                                                                                                                                                                                                                           
                            height={150}                                                                                                                                                                                                                                  
                            itemCount={transcript.length}                                                                                                                                                                                                                 
                            itemSize={35}                                                                                                                                                                                                                                 
                            width="100%"                                                                                                                                                                                                                                  
                            className="mt-4 overflow-y-auto"                                                                                                                                                                                                              
                          >                                                                                                                                                                                                                                               
                            {Row}                                                                                                                                                                                                                                         
                          </List> 
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
}

export default VideoModal;
