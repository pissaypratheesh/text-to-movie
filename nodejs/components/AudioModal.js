import React, { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import Loader from "./Loading";
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
    setSelectedMusic(music);
    //playSelectedMusic(music);
  };

  return (
    <Modal isOpen={true} className="bg-white p-6 rounded-lg shadow-lg">
      {isLoading ? (
        <Loader text={"audio fetcing.."}/>
      ) : (
        <div className="grid grid-cols-none auto-cols-auto gap-4 flex flex-wrap">
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
    </Modal>
  );
});


export default AudioModal;
