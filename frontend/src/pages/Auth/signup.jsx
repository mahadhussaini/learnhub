import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link, Navigate } from "react-router-dom";
import sqr from "../../img/sqr.svg";
import sqr2 from "../../img/sqr2.svg";
import sqr3 from "../../img/sqr3.svg";
import sqr4 from "../../img/sqr4.svg";
import React from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
    if (user) {
      <Navigate to="/login" replace={true} />;
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 text-white">
      {user && <Navigate to="/login" replace={true} />}
      <img alt="err" src={sqr} className="absolute top-0 left-0 w-24 md:w-40" />
      <img
        alt="err"
        src={sqr2}
        className="absolute top-0 right-0 w-24 md:w-40"
      />
      <img
        alt="err"
        src={sqr3}
        className="absolute bottom-0 left-0 w-24 md:w-40"
      />
      <img
        alt="err"
        src={sqr4}
        className="absolute bottom-0 right-0 w-24 md:w-40"
      />

      <form
        className="bg-gray-800 p-8 rounded-lg shadow-md w-[90%] max-w-md flex flex-col space-y-6"
        onSubmit={handleSubmit}
      >
        <h3 className="text-4xl font-semibold text-center mb-6">Sign Up</h3>

        <div className="relative">
          <label className="block text-gray-400 mb-2">Username:</label>
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-600 rounded-lg p-4 w-full text-black transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="relative">
          <label className="block text-gray-400 mb-2">Email:</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="border border-gray-600 rounded-lg p-4 w-full text-black transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="on"
          />
          <p className="mt-1 text-sm text-red-500">
            {error && !email && "Please provide a valid email address."}
          </p>
        </div>

        <div className="relative">
          <label className="block text-gray-400 mb-2">Password:</label>
          <input
            type="password"
            placeholder="********"
            className="border border-gray-600 rounded-lg p-4 w-full text-black transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="on"
          />
        </div>

        <button
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-500 py-3 rounded-lg text-xl font-semibold transition transform hover:scale-105 w-full"
        >
          Sign Up
        </button>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        <div className="text-center mt-6">
          <hr className="border-t border-gray-600 w-full my-4" />
          <span className="text-gray-400">Or</span>
        </div>

        <span className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
