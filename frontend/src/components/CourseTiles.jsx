import React from "react";

const CourseTiles = ({ chapter }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
      <img
        src={chapter.image}
        alt={chapter.title}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <h3 className="font-bold text-lg mt-2">{chapter.title}</h3>
      <p className="text-gray-600 text-sm md:text-base">
        {chapter.description}
      </p>
    </div>
  );
};

export default CourseTiles;
