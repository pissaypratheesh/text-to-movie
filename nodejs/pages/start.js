import { useState } from "react";
import axios from "axios";
import YouTubePlayer from "../components/YouTubePlayer";
import TranscriptSearch from "../components/TranscriptSearch";
import TranscriptList from "../components/TranscriptList";
import Editor from "@monaco-editor/react";  

function Start() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [responseData, setResponseData] = useState("");
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [summary, setSummary] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/ytvideos?url=${encodeURIComponent(youtubeUrl)}`);
      let data = response && response.data;
      if(data){
        let videoData = data[0]
        let {videoId, thumbnails, duration, title, descriptionSnippet, stream, transcript = []} = videoData || {}
        let summary = transcript.map((item) => item.text).join(" ");
        setResponseData(response.data);
        setVideoId(videoId);
        setTranscript(transcript);
        setSummary(summary);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center my-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="Enter YouTube URL..."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
          onClick={handleButtonClick}
        >
          Fetch
        </button>
      </div>
      {responseData && (
        <>
          <YouTubePlayer videoId={videoId} />
          <TranscriptSearch
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
          <TranscriptList
            filteredTranscript={transcript.filter((item) =>
              item.text.toLowerCase().includes(searchKeyword.toLowerCase())
            )}
            changeTime={(time) => {
              console.log("Change time to:", time);
            }}
          />
          <Editor
            height="40vh"
            language="markdown"
            theme="vs-dark"
            value={summary}
            options={{
              readOnly: true,
              minimap: { enabled: false },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Start;
