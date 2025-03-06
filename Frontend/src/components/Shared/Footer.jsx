import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-300 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">STARCONNECT</h2>
            <p className="mt-2 text-sm">Connecting talent with opportunities in the entertainment industry.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <ul className="flex justify-center md:justify-end space-x-6 text-sm">
              <li>
                <a href="#about" className="hover:text-gray-400">About</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-400">Contact</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-gray-400">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-gray-400">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">&copy; 2025 STARCONNECT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
