import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Download, Trophy, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Results: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Mock Published Result
  const mockResult = {
    examName: "HSC Physics Model Test 01",
    publishDate: "Oct 14, 2026",
    score: 45,
    total: 50,
    percentage: 90,
    rank: 4,
    correct: 45,
    wrong: 5,
    unanswered: 0
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Search Your Results</h1>
          <p className="text-gray-500">Enter your Student ID to view published exam results and download PDF reports.</p>
        </div>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-12">
          <input 
            type="text" 
            required 
            placeholder="Enter Student ID (e.g. EXAM-2026-001)" 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full p-5 pl-6 pr-32 bg-white border border-gray-200 rounded-full shadow-lg shadow-gray-200/50 focus:ring-2 focus:ring-primary outline-none text-lg font-medium"
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-full font-bold hover:bg-primary/90 transition shadow-md flex items-center gap-2">
            <Search size={20} /> Search
          </button>
        </form>

        {hasSearched && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                <Trophy size={150} />
              </div>
              <h2 className="text-3xl font-bold mb-2">{mockResult.examName}</h2>
              <p className="text-primary-100">Published on: {mockResult.publishDate}</p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 text-sm font-bold uppercase mb-1">Obtained Marks</p>
                  <p className="text-3xl font-black text-primary">{mockResult.score}<span className="text-lg text-gray-400 font-medium">/{mockResult.total}</span></p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 text-sm font-bold uppercase mb-1">Percentage</p>
                  <p className="text-3xl font-black text-green-500">{mockResult.percentage}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 text-sm font-bold uppercase mb-1">Rank</p>
                  <p className="text-3xl font-black text-yellow-500">#{mockResult.rank}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center gap-1">
                  <p className="text-xs font-bold text-green-600 flex justify-between"><span>Correct:</span> <span>{mockResult.correct}</span></p>
                  <p className="text-xs font-bold text-red-500 flex justify-between"><span>Wrong:</span> <span>{mockResult.wrong}</span></p>
                  <p className="text-xs font-bold text-gray-500 flex justify-between"><span>Skipped:</span> <span>{mockResult.unanswered}</span></p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">
                  <Download size={20} /> Download Result PDF
                </button>
                <button className="flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                  <FileText size={20} /> View Answer Sheet
                </button>
              </div>
              
              <div className="mt-6 flex items-start gap-2 p-4 bg-blue-50 text-blue-700 rounded-xl text-sm border border-blue-100">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <p>Answer sheets are only available because the admin has published this result. If a result is unpublished, you will lose access to this page.</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Results;
