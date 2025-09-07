import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">TechHub</h3>
            <p className="text-blue-100 text-sm">
              We bring the latest technology and innovative gadgets right to your doorstep. Quality electronics, accessories, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white text-sm">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-blue-100 hover:text-white text-sm">Shop</Link>
              </li>
              <li>
                <Link to="/cart" className="text-blue-100 hover:text-white text-sm">Cart</Link>
              </li>
              <li>
                <Link to="/orders" className="text-blue-100 hover:text-white text-sm">My Orders</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-blue-100 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-blue-100 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@techhub.com</span>
              </li>
              <li className="flex items-start text-blue-100 text-sm">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>123 Tech Street, Digital City, CA 90210</span>
              </li>
            </ul>
          </div>

          {/* Social Media and Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-blue-100 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full text-sm text-gray-900 rounded-l focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100 text-sm">
          <p>&copy; {new Date().getFullYear()} TechHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
