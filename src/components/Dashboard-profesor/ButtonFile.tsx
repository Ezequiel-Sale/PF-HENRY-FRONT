import React from "react";

const ButtonFile = () => {
  return (
    <div className="relative inline-block">
      <input 
        type="file" 
        id="file-input" 
        className="hidden" 
      />
      <label 
        htmlFor="file-input" 
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300"
      >
        <span className="mr-2">📁</span>
        <span>Rutina</span>
      </label>
    </div>
  );
};

export default ButtonFile;
