import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Copyright,
} from "lucide-react";
import Logo from "../../assets/images/blacklistdb-white.png";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: "Home", href: "/" },
    { title: "Report Scam", href: "/report" },
    { title: "Scammer Database", href: "/scammerslist" },
    { title: "Blog", href: "/blog" },
    { title: "About Us", href: "/aboutus" },
  ];

  const legalLinks = [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Cookie Policy", href: "/cookies" },
    { title: "Disclaimer", href: "/disclaimer" },
  ];

  const socialMedia = [
    {
      icon: Facebook,
      href: "https://facebook.com",
      color: "text-blue-600",
    },
    {
      icon: Twitter,
      href: "https://x.com/theblacklistdb",
      color: "text-sky-400",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/theblacklistdb/",
      color: "text-pink-600",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      color: "text-blue-800",
    },
  ];

  return (
    <footer className="bg-[#323338] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center space-y-3 space-x-2">
              <img src={Logo} alt="Logo" className="w-10 h-10" />
              <span className="text-xl font-bold">BlacklistDB</span>
            </Link>
            <p className="text-gray-400 mb-4 font-regular">
              Empowering shoppers by exposing scams and protecting consumers
              from financial fraud.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((platform, index) => (
                <a
                  key={index}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${platform.color} hover:opacity-75 transition-opacity`}
                >
                  <platform.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 font-regular hover:text-white transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 font-regular hover:text-white transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 font-regular mb-4">
              Subscribe to our newsletter for the latest scam alerts and
              protection tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#812018]"
              />
              <button className="bg-[#812018] text-white px-4 rounded-r-lg hover:bg-red-700 transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 mt-8 pt-6 text-center">
          <p className="flex items-center justify-center text-gray-400 font-regular">
            <Copyright size={16} className="mr-2" />
            {currentYear} Blacklist Database. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
