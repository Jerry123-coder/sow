// import { Link } from 'react-router-dom';

// export const Footer = () => {
//   return (
//     <footer className=" bg-gray-900 text-white py-12 w-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Grace Church</h3>
//             <p className="text-gray-400">A place where faith grows and community thrives.</p>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Contact</h3>
//             <p className="text-gray-400">123 Church Street</p>
//             <p className="text-gray-400">City, State 12345</p>
//             <p className="text-gray-400">Phone: (555) 123-4567</p>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
//             <div className="space-y-2">
//               <Link to="/about" className="block text-gray-400 hover:text-white">About</Link>
//               <Link to="/services" className="block text-gray-400 hover:text-white">Services</Link>
//               <Link to="/events" className="block text-gray-400 hover:text-white">Events</Link>
//               <Link to="/register" className="block text-gray-400 hover:text-white">Join Us</Link>
//             </div>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//           <p>© 2024 Grace Church. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };


import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Calendar } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-5 md:px-0 w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Church Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-purple-400" />
              Our Lady Seat of Wisdom
            </h3>
            <p className="text-gray-400 mb-4">A vibrant Catholic community dedicated to spreading God's love and message.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-400" />
              Contact Us
            </h3>
            <div className="text-gray-400 space-y-2">
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                P. O. Box AK 248, Abokobi, Accra
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                0208138335 / 0243240815
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                seatofwisdomcc95@gmail.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-400" />
              Quick Links
            </h3>
            <div className="space-x-20 md:space-x-0 flex items-center md:justify-between">
              <span>
              <Link to="/about" className="block text-gray-400 hover:text-purple-400">About Us</Link>
              <Link to="/societies" className="block text-gray-400 hover:text-purple-400">Societies</Link>
              <Link to="/sacraments" className="block text-gray-400 hover:text-purple-400">Sacraments</Link>
              </span>
              <span>
              <Link to="/announcements" className="block text-gray-400 hover:text-purple-400">Announcements</Link>
              <Link to="/giving" className="block text-gray-400 hover:text-purple-400">Online Giving</Link>
              <a href="#mass-schedule" className="block text-gray-400 hover:text-purple-400">Mass Schedule</a>
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Our Lady Seat of Wisdom Catholic Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;