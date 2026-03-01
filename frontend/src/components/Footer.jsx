import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiCamera } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiCamera className="text-accent text-2xl" />
              <span className="text-xl font-bold">VG Visuals</span>
            </div>
            <p className="text-gray-400 text-sm">
              Capturing moments, creating memories. Professional photography portfolio.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/gallery" className="block text-gray-400 hover:text-accent text-sm">Gallery</Link>
              <Link to="/feed" className="block text-gray-400 hover:text-accent text-sm">Feed</Link>
              <Link to="/about" className="block text-gray-400 hover:text-accent text-sm">About</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-accent text-sm">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent text-xl transition-colors">
                <FiInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent text-xl transition-colors">
                <FiTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent text-xl transition-colors">
                <FiFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent text-xl transition-colors">
                <FiMail />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} VG Visuals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
