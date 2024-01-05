import React from "react";

const TranscriptSearch = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <input
      type="text"
      className="w-full p-2 border border-gray-300 rounded mt-4"
      placeholder="Search transcript..."
      value={searchKeyword}
      onChange={(e) => setSearchKeyword(e.target.value)}
    />
  );
};

export default TranscriptSearch;
