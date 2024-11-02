/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-blue-800 text-white p-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Contact Us
          </a>
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubscribe} className="flex justify-center">
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-l-md border border-gray-600"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-r-md hover:bg-blue-600"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          {" "}
          {/* Flexbox for horizontal layout */}
          <a href="#" className="text-gray-400 hover:text-white">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaLinkedin />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
