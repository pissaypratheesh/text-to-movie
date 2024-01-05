import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
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
  }, []);

  const playSelectedMusic = async (music) => {
    try {
      await axios.post("PLAY_MUSIC_API_URL", { music });
    } catch (error) {
      console.error("Error playing selected music:", error);
    }
  };

  const handleMusicSelection = (music) => {
    setSelectedMusic(music);
    playSelectedMusic(music);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {backgroundMusicList.map((music) => (
        <div
          key={music.id}
          onClick={() => handleMusicSelection(music)}
          className={selectedMusic === music ? "selected" : ""}
        >
          {music.name}
        </div>
      ))}
    </>
  );
});

  const store = useStore();
  const { sentences } = store;
 

  return (
    <>
    </>
  );
})

export default AudioModal;
