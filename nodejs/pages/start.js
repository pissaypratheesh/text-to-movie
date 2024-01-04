import { useState } from 'react';
import axios from 'axios';

function Start() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [responseData, setResponseData] = useState('');

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/ytvideos?url=${encodeURIComponent(youtubeUrl)}`);
      setResponseData(response.data);
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
      <div className="response-data">
        {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default Start;
