import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth();

  return (
    <nav className="fixed w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              EXAM TEST
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition font-medium">Home</Link>
            
            {currentUser ? (
              <Link 
                to={isAdmin ? "/admin" : "/dashboard"} 
                className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 transition shadow-lg shadow-primary/30"
              >
                <User size={18} />
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="flex items-center gap-1 text-primary font-medium hover:text-primary/80">
                  <LogIn size={18} /> Login
                </Link>
                <Link to="/register" className="bg-secondary text-white px-5 py-2 rounded-full hover:bg-secondary/90 transition shadow-lg shadow-secondary/30">
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">Home</Link>
            {currentUser ? (
              <Link to={isAdmin ? "/admin" : "/dashboard"} className="block px-3 py-2 text-primary font-bold">
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Link>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-primary font-medium">Login</Link>
                <Link to="/register" className="block px-3 py-2 text-secondary font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
