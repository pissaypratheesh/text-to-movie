import React, { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';

const MyComponent = () => {
  const [jsonCode, setJsonCode] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.example.com/search?query=${searchValue}`);
      setJsonCode(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 flex">
        <input
          type="text"
          className="rounded-l px-4 py-2 border-t border-b border-l text-gray-800 border-gray-200 bg-white focus:outline-none"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="rounded-r px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="w-full h-64">
        <Editor
          height="100%"
          defaultLanguage="json"
          defaultValue={jsonCode}
          options={{
            readOnly: true,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
};

export default MyComponent;