import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a className="block text-gray-600 hover:text-primary">Shop</a>
              <a className="block text-gray-600 hover:text-primary">Categories</a>
              <a className="block text-gray-600 hover:text-primary">Contact</a>
              <a className="block text-gray-600 hover:text-primary">Blog</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <div className="space-y-2">
              <a className="block text-gray-600 hover:text-primary">Privacy Policy</a>
              <a className="block text-gray-600 hover:text-primary">Terms & Conditions</a>
              <a className="block text-gray-600 hover:text-primary">Returns</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-600">
              <p>1 Vo Van Ngan Street</p>
              <p>Ho Chi Minh City</p>
              <p>Email: 22110389@student.hcmute.edu.vn</p>
              <p>Phone: (+84) 0862267674 </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90">
                Subscribe
              </button>
              <div className="flex space-x-4">
                <FaFacebookF className="text-gray-600 hover:text-primary cursor-pointer" />
                <FaTwitter className="text-gray-600 hover:text-primary cursor-pointer" />
                <FaInstagram className="text-gray-600 hover:text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 pt-8 border-t">
          <p>&copy; 2025 QueTaste. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
