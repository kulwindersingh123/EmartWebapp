import React from 'react';
import { FaYoutube, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto px-6 py-8 flex flex-col items-center">
        <p className="text-lg font-semibold mb-4 text-center" title="YouTube Channel">
          Emart Ecommerce website
        </p>
        <div className="flex space-x-6">
          <a
            href="https://www.youtube.com/@KulwinderSingh-ip1nt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors duration-300"
            title="YouTube"
          >
            <FaYoutube size={24} />
          </a>
          <a
            href="https://github.com/kulwindersingh123/Emart"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-300"
            title="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/kulwinder-singh-214b811b2/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
            title="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} Emart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
