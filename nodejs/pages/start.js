import { useState, useEffect, useRef } from "react";
import axios from "axios";
import YouTubePlayer from "../components/YouTubePlayer";
import TranscriptSearch from "../components/TranscriptSearch";
import TranscriptList from "../components/TranscriptList";
import SummaryEditor from "../components/SummaryEditor";
import { useStore } from "../components/StoreProvider";
import AssetsAggregation from "../components/AssetsAggregation";
import Loading from "../components/Loading";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
const Start = observer(function Start() {
  const store = useStore();  
  const [youtubeUrl, setYoutubeUrl] = useState(null)//'https://www.youtube.com/watch?v=Fbbu_GQcrwc');
  const playerRef = useRef(null);
  const [responseData, setResponseData] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videodata, setVideodata] = useState();
  const [transcript, setTranscript] = useState([]);
  const [summary, setSummary] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [finalSummary, setFinalSummary] = useState();

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8081/api/ytvideos?url=${encodeURIComponent(youtubeUrl)}`);
      setIsLoading(false);
      let data = response && response.data;
      if(data){
        let videoData = data[0]
        let {videoId, thumbnails, duration, title, descriptionSnippet, stream, transcript = []} = videoData || {}
        let summary = transcript.map((item) => item.text).join(" ");
        setVideodata(videoData);
        setResponseData(response.data);
        setVideoId(videoId);
        setTranscript(transcript);
        setSummary(summary);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    playerRef.current = event.target;
    event.target.playVideo();
  };
  const changeTime = (seconds) => {
    playerRef.current.seekTo(seconds);
    playerRef.current.playVideo();
  };


  return (
    <div className="container mx-auto">
      <div className="flex items-center my-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="Enter YouTube URL..."
          value={youtubeUrl}
          disabled={!!finalSummary}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
          onClick={handleButtonClick}
          disabled={!!finalSummary}
        >
          Fetch
        </button>
      </div>
      {responseData && !finalSummary && (
        <>
          <YouTubePlayer
            videoId={videoId}
            onReady={onReady}
          />
          <TranscriptSearch
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
          <TranscriptList
            filteredTranscript={transcript.filter((item) =>
              item.text.toLowerCase().includes(searchKeyword.toLowerCase())
            )}
            changeTime={changeTime}
          />
          {summary && (
            <SummaryEditor 
                summary={summary} 
                onUpdate={(editedSummary) => {
                    setSummary(editedSummary);
                    setFinalSummary(editedSummary);
                    let parsed = JSON.parse(editedSummary)
                    if(parsed){
                        //parsed.summary = parsed.summary.map((line, index) => ({ index, line }))
                        store.updateSentences(parsed.summary);
                        store.updateData({...parsed, ...videodata},'videodata');
                    }
                }}
            />)}
        </>
      )}
      {finalSummary && (
          <>
            <AssetsAggregation />
          </>
      )}
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
})

export default Start;
