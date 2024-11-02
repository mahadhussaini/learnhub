import error from "../img/error.svg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-8">
        Oops! I'm working on it!
      </h2>
      <img alt="Error" src={error} className="w-1/2 md:w-1/3 lg:w-1/4" />
      <Link to="/Dashboard">
        <button
          type="button"
          className="mt-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg px-6 py-3 transition duration-300"
        >
          Go Back to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
