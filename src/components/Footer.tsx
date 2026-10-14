import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-white">EXAM TEST</span>
            </div>
            <p className="text-gray-400 text-sm">
              The most advanced and secure online examination management platform. 
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2"><Phone size={18} /> <span>+880 1XXX-XXXXXX</span></li>
              <li className="flex items-center gap-2"><Mail size={18} /> <span>support@examtest.com</span></li>
              <li className="flex items-center gap-2"><MapPin size={18} /> <span>Chandpur, Bangladesh</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} EXAM TEST. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
