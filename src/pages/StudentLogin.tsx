import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogIn, Phone, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const StudentLogin: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mobileNumber.length !== 11) {
      toast.error("মোবাইল নম্বর ১১ ডিজিটের হতে হবে");
      return;
    }

    toast.info("Firebase Authentication setup is next...");
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md glass-effect"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
              <LogIn size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Student Login</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Phone className="absolute inset-y-0 top-4 left-4 text-gray-400" size={18} />
              <input 
                type="tel" 
                required 
                placeholder="Mobile Number (01...)" 
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="pl-12 w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" 
              />
            </div>

            <div className="relative">
              <Lock className="absolute inset-y-0 top-4 left-4 text-gray-400" size={18} />
              <input 
                type="password" 
                required 
                placeholder="Password / PIN" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary outline-none" 
              />
            </div>

            <button type="submit" className="w-full bg-secondary text-white font-bold p-4 rounded-lg hover:bg-secondary/90 transition shadow-lg">
              Login securely
            </button>
          </form>

          <div className="mt-8 text-center text-gray-500">
            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register now</Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default StudentLogin;
