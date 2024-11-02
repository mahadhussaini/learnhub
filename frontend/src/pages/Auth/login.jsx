import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import sqr from "../../img/sqr.svg";
import sqr2 from "../../img/sqr2.svg";
import sqr3 from "../../img/sqr3.svg";
import sqr4 from "../../img/sqr4.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { login, error, isLoading } = useLogin();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (user) {
      <Navigate to="/Dashboard" replace={true} />;
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-white login bg-gray-900">
      {user && <Navigate to="/Dashboard" replace={true} />}
      <img
        alt="err"
        src={sqr}
        className="absolute top-0 left-0 lg:w-[200px] w-[100px]"
      />
      <img
        alt="err"
        src={sqr2}
        className="absolute top-0 right-0 lg:w-[200px] w-[100px]"
      />
      <img
        alt="err"
        src={sqr3}
        className="absolute bottom-0 left-0 lg:w-[200px] w-[100px]"
      />
      <img
        alt="err"
        src={sqr4}
        className="absolute bottom-0 right-0 lg:w-[200px] w-[100px]"
      />

      <form
        className="flex flex-col bg-gray-800 p-8 rounded-lg shadow-md w-[90%] max-w-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-4xl font-semibold text-center mb-6 text-white">
          Log in
        </h3>

        <div className="relative mb-6">
          <label className="absolute top-[-22px] left-2 text-gray-400">
            Email:
          </label>

          <br />

          <input
            type="email"
            placeholder="you@example.com"
            className="border border-gray-700 rounded-lg p-4 w-full text-black transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="on"
          />
          {error && (
            <div className="text-center text-red-600 mt-2">{error}</div>
          )}
        </div>

        <br />

        <div className="relative mb-8">
          <label className="absolute top-[-22px] left-2 text-gray-400">
            Password:
          </label>

          <br />

          <input
            type={visible ? "text" : "password"}
            placeholder="Password@123"
            className="border border-gray-700 rounded-lg p-4 w-full text-black transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="on"
          />

          <div className="absolute right-4 top-[12px] cursor-pointer text-gray-600">
            <br />
            {visible ? (
              <VisibilityIcon onClick={() => setVisible(false)} />
            ) : (
              <VisibilityOffIcon onClick={() => setVisible(true)} />
            )}
          </div>
          {error && (
            <div className="text-center text-red-600 mt-2">{error}</div>
          )}
        </div>

        <button
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-3 text-xl font-semibold transition transform hover:scale-105 duration-200 ease-in-out w-full mb-6"
        >
          Log in
        </button>

        <div className="text-center mb-6">
          <hr className="border-t border-gray-600 w-full my-4" />
          <span className="text-gray-400">Or</span>
        </div>

        <div className="text-center">
          <span className="text-white">Don't have an account? </span>
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
