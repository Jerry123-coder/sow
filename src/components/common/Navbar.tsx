import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
            <span className='bg-purple-200 rounded-full w-10 h-10'></span>
              <span className="text-xl font-bold text-purple-900">Our Lady Seat Of Wisdom</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-purple-600">Services</Link>
            <Link to="/events" className="text-gray-700 hover:text-purple-600">Events</Link>
            <Link 
              to="/register" 
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 hover:text-white"
            >
              Join Us
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-purple-600">About</Link>
              <Link to="/services" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Services</Link>
              <Link to="/events" className="block px-3 py-2 text-gray-700 hover:text-purple-600">Events</Link>
              <Link 
                to="/register" 
                className="block px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Join Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};