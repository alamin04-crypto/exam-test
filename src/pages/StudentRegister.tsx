import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserPlus, Phone, Mail, Lock, User, BookOpen, Layers } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const StudentRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    course: '',
    batch: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.mobileNumber)) {
      toast.error("অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে");
      return;
    }

    toast.info("Firebase Authentication setup is next...");
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl glass-effect"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <UserPlus size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute inset-y-0 top-3 left-3 text-gray-400" size={18} />
                <input type="text" name="fullName" required placeholder="Full Name" onChange={handleChange}
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>

              <div className="relative">
                <Phone className="absolute inset-y-0 top-3 left-3 text-gray-400" size={18} />
                <input type="tel" name="mobileNumber" required placeholder="Mobile Number (01...)" onChange={handleChange}
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute inset-y-0 top-3 left-3 text-gray-400" size={18} />
              <input type="email" name="email" required placeholder="Email Address" onChange={handleChange}
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <BookOpen className="absolute inset-y-0 top-3 left-3 text-gray-400" size={18} />
                <select name="course" required onChange={handleChange}
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none">
                  <option value="">Select Course</option>
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="Admission">University Admission</option>
                </select>
              </div>

              <div className="relative">
                <Layers className="absolute inset-y-0 top-3 left-3 text-gray-400" size={18} />
                <select name="batch" required onChange={handleChange}
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none">
                  <option value="">Select Batch</option>
                  <option value="Science">Science</option>
                  <option value="Arts">Arts</option>
                  <option value="Commerce">Commerce</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <Lock className="absolute inset-y-0 top-3 left-3 text-gray-400" size={18} />
              <input type="password" name="password" required placeholder="Secure Password / PIN" onChange={handleChange}
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
            </div>

            <button type="submit" className="w-full bg-primary text-white font-bold p-3 rounded-lg hover:bg-primary/90 transition shadow-lg">
              Register Now
            </button>
          </form>

          <div className="mt-6 text-center text-gray-500">
            Already have an account? <Link to="/login" className="text-secondary font-bold hover:underline">Login here</Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default StudentRegister;
