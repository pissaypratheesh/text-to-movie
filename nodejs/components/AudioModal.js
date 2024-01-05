import React, { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import Loader from "./Loading";
import Audio from "./Audio";
import { useRef, useState } from "react";
import { useStore } from "./StoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
var _ = require("underscore");
_.mixin(require('../mixins'))

const AudioModal = observer(function AudioModal({ ttsURL, toggleAudioModal }) {
  const [backgroundMusicList, setBackgroundMusicList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [blendedAudioPath, setBlendedAudioPath] = useState(null);
  const store = useStore();
  const { sentences } = store;

  const fetchBackgroundMusic = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/bglist`);
      setBackgroundMusicList(response.data);
    } catch (error) {
      console.error("Error fetching background music:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBackgroundMusic();
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
      }
    };
  }, []);

 

  const handleMusicSelection = (music) => {
    console.log("🚀 ~ file: AudioModal.js:44 ~ handleMusicSelection ~ music:", music,ttsURL)
    setSelectedMusic(music);
    if (ttsURL && music.url) {
      blendAudio(ttsURL, music.url);
    }
  };

  const blendAudio = async (tts, bg) => {
    try {
      const response = await axios.get(`/api/blendaudio?tts=${tts}&bg=${bg}`);
      setBlendedAudioPath(response.data.path);
    } catch (error) {
      console.error("Error blending audio:", error);
    }
  };

  return (
    <Modal isOpen={true} className="bg-white p-6 rounded-lg shadow-lg relative">
      <button
        className="absolute top-0 right-0 mt-2 mr-2 text-xl font-bold text-gray-600 hover:text-gray-800"
        onClick={() => toggleAudioModal(false)}
      >
        &times;
      </button>
      {isLoading ? (
        <Loader text={"audio fetcing.."}/>
      ) : (
        <div className="flex flex-wrap gap-4">
          {backgroundMusicList.map((music) => (
            <div
              key={music.id || music.name}
              onClick={() => handleMusicSelection(music)}
              className={`cursor-pointer p-2 rounded-full whitespace-nowrap ${
                selectedMusic === music ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {music.name}
            </div>
          ))}
        </div>
      )}
      {selectedMusic && <Audio key={selectedMusic.url} src={selectedMusic.url} play={true}></Audio>}
      {blendedAudioPath && <p className="mt-4 text-green-600">Blended audio path: {blendedAudioPath}</p>}
    </Modal>
  );
});


export default AudioModal;
