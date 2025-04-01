import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

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

        {/* Newsletter Section */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
          <p className="text-sm text-gray-400">Get the latest updates on casting calls and industry news.</p>
          <Link to="/news" className="mt-4 inline-block bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700">
            Go to Newsletter
          </Link>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white text-xl"><Facebook /></a>
          <a href="#" className="text-gray-400 hover:text-white text-xl"><Twitter /></a>
          <a href="#" className="text-gray-400 hover:text-white text-xl"><Instagram /></a>
          <a href="#" className="text-gray-400 hover:text-white text-xl"><Youtube /></a>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} STARCONNECT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;