import React from "react";

const Loading = ({ text }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      <p className="text-xl font-semibold ml-4">{text}</p>
    </div>
  );
};

export default Loading;
