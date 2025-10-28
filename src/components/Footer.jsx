import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import vietgap from "../assets/vietgap.png";
import ocop from "../assets/ocop.png";
import iso22000 from "../assets/iso_22000.png";
import haccp from "../assets/haccp.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-que-surface pt-4 pb-2 border-t border-que-secondary/20">
      <div className="w-full px-6 mt-5">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-3 text-que-text-main">
              Truy cập nhanh
            </h4>
            <div className="space-y-1">
              <a href="/" className="block text-que-text-muted hover:text-que-primary">
                Trang chủ
              </a>
              <a href="/products" className="block text-que-text-muted hover:text-que-primary">
                Sản phẩm
              </a>
              <a href="/contact" className="block text-que-text-muted hover:text-que-primary">
                Liên hệ
              </a>
              <a href="/about" className="block text-que-text-muted hover:text-que-primary">
                Giới thiệu
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-que-text-main">Policies</h4>
            <div className="space-y-1">
              <a className="block text-que-text-muted hover:text-que-primary">
                Privacy Policy
              </a>
              <a className="block text-que-text-muted hover:text-que-primary">
                Terms & Conditions
              </a>
              <a className="block text-que-text-muted hover:text-que-primary">
                Returns
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-que-text-main">
              Liên hệ chúng tôi
            </h4>
            <div className="space-y-1 text-que-text-muted text-sm">
              <p>Số 1 đường Võ Văn Ngân, Thành phố Hồ Chí MInh</p>
              <p>Email: quetaste@gmail.com</p>
              <p>SĐT: (+84) 0862267674</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-que-text-main">
              Newsletter
            </h4>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-que-primary"
              />
              <Link
                to="/contact"
                className="w-full block text-center px-3 py-2 bg-que-primary text-white rounded-lg text-sm hover:bg-que-accent transition-colors"
              >
                Subscribe
              </Link>

              <div className="flex space-x-3">
                <FaFacebookF className="text-que-text-muted hover:text-que-primary cursor-pointer" />
                <FaTwitter className="text-que-text-muted hover:text-que-primary cursor-pointer" />
                <FaInstagram className="text-que-text-muted hover:text-que-primary cursor-pointer" />
                <FaYoutube className="text-que-text-muted hover:text-que-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Certifications row */}
        <div className="flex justify-center space-x-4 pb-3">
          <img src={vietgap} alt="VietGAP" className="h-16" />
          <img src={ocop} alt="OCOP" className="h-16" />
          <img src={iso22000} alt="ISO 22000" className="h-16" />
          <img src={haccp} alt="HACCP" className="h-16" />
        </div>

        <div className="text-center text-que-text-muted pt-4 border-t border-que-secondary/20 text-sm">
          <p>
            &copy; 2025 QueTaste. Gìn giữ hương vị quê hương, kết nối mọi miền.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
