import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Trophy, ShieldCheck, Timer } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mt-10 md:mt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block p-3 px-6 rounded-full bg-accent/20 text-primary font-semibold mb-6 border border-accent/50"
            >
              🚀 The Ultimate Online Exam Platform
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6"
            >
              Master Your Skills with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                EXAM TEST
              </span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex justify-center gap-4 flex-col sm:flex-row"
            >
              <Link to="/register" className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                Get Started Now <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>

          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Brain className="text-secondary" size={32} />} title="AI Question Bank" desc="Practice with smart, dynamically generated MCQs." />
            <FeatureCard icon={<Timer className="text-primary" size={32} />} title="Live Countdowns" desc="Real-time secure exam timer." />
            <FeatureCard icon={<ShieldCheck className="text-green-500" size={32} />} title="Strict Security" desc="Anti-cheat mechanisms and strict detection." />
            <FeatureCard icon={<Trophy className="text-yellow-500" size={32} />} title="Leaderboards" desc="Compete with your batchmates and climb to the top." />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 transition-all duration-300"
  >
    <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500">{desc}</p>
  </motion.div>
);

export default Home;
