import React, { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import Loader from "./Loader";
import Audio from "./Audio";
import { useRef } from "react";
import { useStore } from "./StoreProvider";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
var _ = require("underscore");
_.mixin(require('../mixins'))

const AudioModal = observer(function AudioModal({}) {
  const [backgroundMusicList, setBackgroundMusicList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const store = useStore();
  const { sentences } = store;

  const fetchBackgroundMusic = async () => {
    try {
      const response = await axios.get("API_URL");
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

  const playSelectedMusic = (music) => {
    if (audioPlayer) {
      audioPlayer.pause();
    }
    const newAudioPlayer = new Audio(music);
    newAudioPlayer.play();
    setAudioPlayer(newAudioPlayer);
  };

  const handleMusicSelection = (music) => {
    setSelectedMusic(music);
    playSelectedMusic(music);
  };

  return (
    <Modal isOpen={true} className="bg-white p-6 rounded-lg shadow-lg">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {backgroundMusicList.map((music) => (
            <div
              key={music.id}
              onClick={() => handleMusicSelection(music)}
              className={`cursor-pointer p-2 rounded-lg ${
                selectedMusic === music ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {music.name}
            </div>
          ))}
        </div>
      )}
      <Audio src={selectedMusic && selectedMusic.url}></Audio>
    </Modal>
  );
});


export default AudioModal;
