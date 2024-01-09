import React, { useState, useEffect, useRef } from "react";
import { useStore } from "./StoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import axios from "axios";

const TTS_API_URL = "http://localhost:3000/api/generate/speech";//?force=true";

const AudioPlayer = observer(function AudioPlayer({onAudioReceived}) {
  const audioRef = useRef(null);
  const store = useStore();
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const fetchAudioURL = async () => {
      let { sentences, videodata } = store;
      if(videodata && sentences){
        videodata = toJS(videodata)
        let { videoId } = videodata || {};
        const data = {
          id: videoId,
          summary: Array.isArray(sentences) ? sentences.map((item) => item.line).join(" ") : sentences,
        };
        console.log("🚀 ~ file: AssetsAggregation.js:97 ~ fetchAudioURL ~ data:", data)

        try {
          const response = await axios.post(TTS_API_URL, data, {
            headers: { "Content-Type": "application/json" },
          });
          let tts = response.data.textToSpeech.path;
          let segments = response.data.speechToTranscript.data.segments;
          if(segments){
            segments = segments.map((item,i) => {
              item.index = i;
              item.line = item.text;
              if(i < segments.length - 1){
                item.assetsEnd = segments[i+1].start
              }
              return item
            })
            console.log("🚀 ~ file: AudioPlayer.js:37 ~ segments=segments.map ~ segments:", segments)
            store.updateSentences(segments);
          }

          if(tts){
            tts = tts.split('/public/')[1];
            let ttspath = `http://localhost:3000/${tts}`
            store.updateData({tts: ttspath, ...videodata},'videodata')
            audioRef.current.src = ttspath;
            setAudioUrl(ttspath)
            onAudioReceived(ttspath)
          }
        } catch (error) {
          console.error("Error fetching audio URL:", error);
        }
      }
      
    };
    fetchAudioURL();
  },[]);

  return <audio ref={audioRef} controls /> //audioUrl ?  <audio ref={audioRef} controls /> : <></>;
});

export default AudioPlayer;


