import React, { useState } from 'react';
import { LayoutDashboard, Users, FileText, BrainCircuit, Settings, LogOut, BookOpen, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AiQuestionGenerator from './components/AiQuestionGenerator';

const AdminDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const adminName = userProfile?.fullName || "Super Admin";

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20">
              <h3 className="text-primary-100 font-medium">Total Students</h3>
              <p className="text-4xl font-bold mt-2">1,245</p>
            </div>
            <div className="bg-secondary text-white p-6 rounded-2xl shadow-lg shadow-secondary/20">
              <h3 className="text-purple-100 font-medium">Active Exams</h3>
              <p className="text-4xl font-bold mt-2">12</p>
            </div>
            <div className="bg-white border p-6 rounded-2xl shadow-sm">
              <h3 className="text-gray-500 font-medium">Total Questions</h3>
              <p className="text-4xl font-bold mt-2 text-gray-900">4,500+</p>
            </div>
          </div>
        );
      case 'ai-generator':
        return <AiQuestionGenerator />;
      default:
        return <div className="p-10 text-center text-gray-500 bg-white rounded-2xl border">This module is under construction.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-dark text-gray-300 w-64 flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'ml-0' : '-ml-64'} fixed h-full z-40 md:relative`}>
        <div className="h-16 flex items-center px-6 bg-gray-900 border-b border-gray-800">
          <BookOpen className="h-6 w-6 text-accent mr-2" />
          <span className="text-xl font-bold text-white tracking-wider">ADMIN</span>
        </div>
        
        <div className="p-4 space-y-1 mt-4">
          <SidebarItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<Users size={20}/>} label="Students" active={activeTab === 'students'} onClick={() => setActiveTab('students')} />
          <SidebarItem icon={<FileText size={20}/>} label="Exam Manager" active={activeTab === 'exams'} onClick={() => setActiveTab('exams')} />
          <SidebarItem icon={<BrainCircuit size={20}/>} label="AI Generator" active={activeTab === 'ai-generator'} onClick={() => setActiveTab('ai-generator')} badge="PRO" />
          <SidebarItem icon={<Settings size={20}/>} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-500/10 text-red-400 transition">
            <LogOut size={20} /> <span className="font-medium">Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border">Secure Session</span>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-primary/20">
              {adminName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
          </div>
          
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: string }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-xl mb-1 transition-all ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-gray-800 hover:text-white'}`}
  >
    <div className="flex items-center gap-3">
      {icon} <span className="font-medium">{label}</span>
    </div>
    {badge && <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${active ? 'bg-white text-primary' : 'bg-purple-500/20 text-purple-400'}`}>{badge}</span>}
  </button>
);

export default AdminDashboard;
