import "./Add-newModule.css";
import React from "react";

const AddNewModule = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner rounded-xl shadow-lg p-6">
        <button
          className="close-btn bg-red-600 hover:bg-red-700 transition duration-300 text-white font-bold rounded-lg px-4 py-2"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </button>
        {props.children}
      </div>
    </div>
  ) : null;
};

export default AddNewModule;
