import React from "react";
import { FixedSizeList as List } from "react-window";

const TranscriptList = ({ filteredTranscript, changeTime }) => {
  const Row = ({ index, style }) => {
    const item = filteredTranscript[index];
    return (
      <button
        onClick={() => {
          changeTime(item.start);
        }}
        className="w-full text-left p-2 hover:bg-gray-200"
        style={style}
      >
        {`${item.start}(${item.duration}): ${item.text}`}
      </button>
    );
  };

  return (
    <List
      height={150}
      itemCount={filteredTranscript.length}
      itemSize={35}
      width="100%"
      className="mt-4 overflow-y-auto"
    >
      {Row}
    </List>
  );
};

export default TranscriptList;
