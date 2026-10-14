import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, BookOpen, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ডামি ডেটা (পরবর্তীতে ফায়ারবেস থেকে আসবে)
const examLeaderboard = [
  { rank: 1, name: "Al Amin", score: 50, percentage: 100, batch: "Science" },
  { rank: 2, name: "Rahim Uddin", score: 48, percentage: 96, batch: "Science" },
  { rank: 3, name: "Karim Hassan", score: 45, percentage: 90, batch: "Science" },
  { rank: 4, name: "Sadiya Akter", score: 42, percentage: 84, batch: "Science" },
  { rank: 5, name: "Mahmudul Hasan", score: 40, percentage: 80, batch: "Science" },
];

const batchLeaderboard = [
  { rank: 1, name: "Al Amin", exams: 12, avgPercentage: 95.5, batch: "HSC Science" },
  { rank: 2, name: "Fahim Rahman", exams: 12, avgPercentage: 92.0, batch: "HSC Science" },
  { rank: 3, name: "Samiya Rahman", exams: 11, avgPercentage: 89.5, batch: "HSC Science" },
];

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exam' | 'batch'>('exam');

  const renderRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="text-yellow-500 w-8 h-8" />;
    if (rank === 2) return <Medal className="text-gray-400 w-8 h-8" />;
    if (rank === 3) return <Award className="text-amber-700 w-8 h-8" />;
    return <span className="text-gray-500 font-bold text-lg w-8 text-center">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Wall of Fame</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">See who is leading the charts. Compete with your batchmates and climb to the top of the leaderboard!</p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-xl shadow-sm border flex gap-2">
            <button 
              onClick={() => setActiveTab('exam')}
              className={`px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition ${activeTab === 'exam' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <BookOpen size={18} /> Exam Leaderboard
            </button>
            <button 
              onClick={() => setActiveTab('batch')}
              className={`px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition ${activeTab === 'batch' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Layers size={18} /> Batch Leaderboard
            </button>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* List Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-5">Student Name</div>
            <div className="col-span-2 text-center">{activeTab === 'exam' ? 'Batch' : 'Exams'}</div>
            <div className="col-span-3 text-right pr-4">{activeTab === 'exam' ? 'Score' : 'Avg. Score'}</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-gray-50">
            {(activeTab === 'exam' ? examLeaderboard : batchLeaderboard).map((student, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-blue-50/50 transition ${student.rank <= 3 ? 'bg-gradient-to-r from-yellow-50/30 to-transparent' : ''}`}
              >
                <div className="col-span-2 flex justify-center items-center">
                  {renderRankIcon(student.rank)}
                </div>
                
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold shadow-md">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{student.name}</h3>
                    {student.rank === 1 && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1 w-max mt-0.5"><Star size={10}/> Top Scorer</span>}
                  </div>
                </div>

                <div className="col-span-2 text-center text-sm font-medium text-gray-500">
                  {activeTab === 'exam' ? (student as any).batch : (student as any).exams}
                </div>

                <div className="col-span-3 text-right pr-4">
                  <span className="text-lg font-black text-primary">
                    {activeTab === 'exam' ? `${(student as any).score}` : `${(student as any).avgPercentage}%`}
                  </span>
                  {activeTab === 'exam' && <span className="text-xs text-gray-400 block font-medium">({student.percentage}%)</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
