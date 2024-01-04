import { useState } from "react";
import axios from "axios";
import YouTubePlayer from "../components/YouTubePlayer";
import TranscriptSearch from "../components/TranscriptSearch";
import TranscriptList from "../components/TranscriptList";
import MonacoEditor from "react-monaco-editor";

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
      setResponseData(response.data);
      setVideoId(response.data.videoId);
      setTranscript(response.data.transcript);
      setSummary(response.data.summary);
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
          />
          <MonacoEditor
            height="200"
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
