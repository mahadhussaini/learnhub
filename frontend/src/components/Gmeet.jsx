// import { Link } from "react-router-dom";
// import PersonIcon from "@mui/icons-material/Person";
import googleMeet from "../img/icons/googleMeet.svg";
import Zoom from "../img/icons/Zoom.svg";

const DashCourseTile = () => {
  return (
    <div className="flex flex-col items-center mx-4 md:mx-20 my-10">
      <h1 className="text-3xl font-bold text-center mb-5">
        Choose Your Meeting Platform
      </h1>

      <div className="flex flex-col md:flex-row justify-around w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-6">
        {/* Google Meet Tile */}
        <div className="flex shadow-lg transition-transform transform hover:scale-105 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl">
          <div className="flex items-center justify-center p-4 bg-blue-100">
            <img src={googleMeet} alt="Google Meet" className="w-16 h-16" />
          </div>
          <div className="flex flex-col justify-center p-4">
            <a href="https://meet.google.com/" className="hover:underline">
              <h1 className="text-xl font-semibold text-blue-600">
                Google Meet
              </h1>
              <p className="text-gray-700">
                Start a meeting or join an existing one.
              </p>
            </a>
          </div>
        </div>

        {/* Zoom Tile */}
        <div className="flex shadow-lg transition-transform transform hover:scale-105 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl">
          <div className="flex items-center justify-center p-4 bg-green-100">
            <img src={Zoom} alt="Zoom Meeting" className="w-16 h-16" />
          </div>
          <div className="flex flex-col justify-center p-4">
            <a href="https://zoom.us/" className="hover:underline">
              <h1 className="text-xl font-semibold text-green-600">
                Zoom Meeting
              </h1>
              <p className="text-gray-700">
                Start a meeting or join an existing one.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCourseTile;
