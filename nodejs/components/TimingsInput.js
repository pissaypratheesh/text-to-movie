import React from "react";

const TimingsInput = ({ timingsText, setTimingsText, validateTimingsText, errorMessage }) => {
  return (
    <>
      <div className="flex items-center mt-2">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded"
          placeholder="Enter selected timings like ['1-3', '4-5'].."
          value={timingsText}
          onChange={(e) => setTimingsText(e.target.value)}
        />
        <button
          type="button"
          className="ml-2 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
          onClick={validateTimingsText}
        >
          Submit
        </button>
      </div>
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </>
  );
};

export default TimingsInput;
