import React, { useState, useEffect } from "react";
import ErrorPage from "../components/ErrorPage";
import Layout from "../components/Layout/Layout";
import { BallTriangle } from "react-loader-spinner";

function Grades() {
  const [grades, setGrades] = useState([]); // Changed to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGrades = async () => {
    setLoading(true);
    setError(null);

    try {
      // Replace with actual API call
      const response = await fetch("http://localhost:4000/api/grades");
      if (!response.ok) throw new Error("");
      const data = await response.json();
      setGrades(data); // Assuming the API returns an array of grades
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-3xl font-bold mb-4">Grades</h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/4 lg:w-1/2">
          {loading ? (
            <div className="flex flex-col items-center">
              <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#6d19d4"
                ariaLabel="ball-triangle-loading"
                visible={true}
              />
              <p className="mt-4 text-gray-600">Loading your grades...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center">
              <ErrorPage />
              <p className="mt-4 text-gray-600 text-center">
                {error}
                <br />
                Please try again later or contact support if the problem
                persists.
              </p>
            </div>
          ) : grades.length > 0 ? ( // Check if there are grades
            <div>
              <h2 className="text-xl font-bold mb-2">Your Grades:</h2>
              <ul className="list-disc list-inside">
                {grades.map((grade, index) => (
                  <li key={index} className="text-gray-800">
                    {grade.subject}: {grade.score}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-gray-600 text-center">
              You have not completed any tasks or assignments yet.
              <br />
              Please check back later for updates.
            </p>
          )}
          <div className="mt-6 flex justify-center">
            <a
              href="/dashboard"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-300"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Grades;
