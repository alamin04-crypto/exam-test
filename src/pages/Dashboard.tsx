import React from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, Trophy, Target, Bell, PlayCircle, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ডামি ডেটা (পরবর্তীতে ফায়ারবেস থেকে আসবে)
const performanceData = [
  { name: 'Exam 1', score: 65 },
  { name: 'Exam 2', score: 78 },
  { name: 'Exam 3', score: 82 },
  { name: 'Exam 4', score: 75 },
  { name: 'Exam 5', score: 90 },
];

const Dashboard: React.FC = () => {
  const studentName = "Al Amin"; // Auth Context থেকে আসবে

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {studentName}! 👋</h1>
            <p className="text-gray-500 mt-1">Here is your academic progress and upcoming exams.</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 text-gray-600 hover:text-primary transition">
            <Bell size={18} /> Notifications
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<FileText className="text-blue-500" />} title="Total Exams" value="12" bg="bg-blue-50" />
          <StatCard icon={<Target className="text-green-500" />} title="Average Score" value="78%" bg="bg-green-50" />
          <StatCard icon={<Trophy className="text-yellow-500" />} title="Best Score" value="95%" bg="bg-yellow-50" />
          <StatCard icon={<Book className="text-purple-500" />} title="Course Rank" value="#4" bg="bg-purple-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Exams & Chart */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Live Exam Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 mb-3 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span> LIVE NOW
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">HSC Physics Model Test 01</h3>
                  <p className="text-gray-500 text-sm mt-1">Chapter: Motion & Dynamics</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">30 <span className="text-sm font-normal text-gray-500">Mins</span></div>
                  <div className="text-sm text-gray-500">50 Marks</div>
                </div>
              </div>
              <button className="w-full sm:w-auto mt-2 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/30">
                <PlayCircle size={20} /> Join Exam Now
              </button>
            </motion.div>

            {/* Performance Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="score" stroke="#4169E1" strokeWidth={3} dot={{ r: 4, fill: '#4169E1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column: Notices & Upcoming */}
          <div className="space-y-8">
            {/* Notice Board */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="text-secondary" size={20} /> Notice Board
              </h3>
              <div className="space-y-4">
                <NoticeItem date="Oct 14" text="Physics Model Test result has been published." isNew />
                <NoticeItem date="Oct 12" text="System maintenance scheduled for tonight 12 AM." />
                <NoticeItem date="Oct 10" text="Registration for University Admission batch is open." />
              </div>
            </div>

            {/* Upcoming Exams */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="text-primary" size={20} /> Upcoming Exams
              </h3>
              <div className="space-y-4">
                <UpcomingItem title="Higher Math Chapter 3" date="Tomorrow, 10:00 AM" />
                <UpcomingItem title="Chemistry Organic" date="Oct 16, 08:00 PM" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Sub-components for clean code
const StatCard = ({ icon, title, value, bg }: { icon: React.ReactNode, title: string, value: string, bg: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition hover:shadow-md">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
    </div>
  </div>
);

const NoticeItem = ({ date, text, isNew }: { date: string, text: string, isNew?: boolean }) => (
  <div className="border-l-2 border-primary pl-3">
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-primary">{date}</span>
      {isNew && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase font-bold">New</span>}
    </div>
    <p className="text-sm text-gray-700 mt-1">{text}</p>
  </div>
);

const UpcomingItem = ({ title, date }: { title: string, date: string }) => (
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
    <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Clock size={12}/> {date}</p>
  </div>
);

export default Dashboard;
