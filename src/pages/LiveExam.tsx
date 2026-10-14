import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle, ChevronRight, ChevronLeft, ShieldAlert } from 'lucide-react';
import { toast } from 'react-toastify';

// ডামি প্রশ্ন (পরবর্তীতে ফায়ারবেস থেকে আসবে)
const dummyQuestions = [
  { id: 1, text: "বাংলাদেশের রাজধানী কোথায়?", options: { A: "ঢাকা", B: "চট্টগ্রাম", C: "সিলেট", D: "রাজশাহী" } },
  { id: 2, text: "নিচের কোনটি ইনপুট ডিভাইস?", options: { A: "মনিটর", B: "কিবোর্ড", C: "প্রিন্টার", D: "স্পিকার" } },
  { id: 3, text: "12 × 8 = ?", options: { A: "88", B: "96", C: "108", D: "92" } },
  { id: 4, text: "HTML এর পূর্ণরূপ কী?", options: { A: "Hyper Text Markup Language", B: "High Text Machine Language", C: "Hyper Tool Multi Language", D: "Hyper Text Multiple Language" } },
  { id: 5, text: "গতিশক্তির সমীকরণ কোনটি?", options: { A: "E = mc^2", B: "F = ma", C: "Ek = 1/2 mv^2", D: "v = u + at" } }
];

const LiveExam: React.FC = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 Minutes in seconds
  const [warnings, setWarnings] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Security: Tab Switching Detection & Right Click Prevention
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmitted) {
        setWarnings(prev => {
          const newWarnings = prev + 1;
          if (newWarnings === 1) {
            toast.error("Warning 1: Please do not change tabs! Your exam will be cancelled next time.", { autoClose: false });
          } else if (newWarnings >= 2) {
            toast.error("Exam Auto-Submitted due to security violation!");
            handleAutoSubmit();
          }
          return newWarnings;
        });
      }
    };

    const preventCopy = (e: ClipboardEvent) => e.preventDefault();
    const preventRightClick = (e: MouseEvent) => e.preventDefault();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("copy", preventCopy);
    document.addEventListener("contextmenu", preventRightClick);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("contextmenu", preventRightClick);
    };
  }, [isSubmitted]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      toast.info("Time is up! Auto-submitting exam.");
      handleAutoSubmit();
      return;
    }
    const timer = setInterval(() => {
      if (!isSubmitted) setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleAutoSubmit = useCallback(() => {
    setIsSubmitted(true);
    // Here we will save answers to Firebase
    setTimeout(() => {
      navigate('/dashboard');
      toast.success("Exam submitted successfully!");
    }, 3000);
  }, [navigate]);

  const manualSubmit = () => {
    if (window.confirm("Are you sure you want to submit? You cannot change answers after submission.")) {
      handleAutoSubmit();
    }
  };

  const handleOptionSelect = (optionKey: string) => {
    setAnswers({ ...answers, [dummyQuestions[currentQIndex].id]: optionKey });
  };

  // Format Time (MM:SS)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Submitted</h2>
          <p className="text-gray-500">Your answers have been saved securely. Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = dummyQuestions[currentQIndex];
  const isAnswered = (id: number) => !!answers[id];

  return (
    <div className="min-h-screen bg-gray-50 select-none">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 hidden sm:block">Model Test - IT & Physics</h1>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium border">ID: {examId || "DEMO"}</span>
          </div>
          
          <div className="flex items-center gap-6">
            {warnings > 0 && (
              <div className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full font-bold text-sm border border-red-200 animate-pulse">
                <ShieldAlert size={16} /> Warning: {warnings}/2
              </div>
            )}
            <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-1.5 rounded-lg ${timeLeft < 300 ? 'bg-red-100 text-red-600 border border-red-200 animate-pulse' : 'bg-primary/10 text-primary border border-primary/20'}`}>
              <Clock size={20} /> {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Question Area (Left 3 Columns) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-bold text-gray-500">Question {currentQIndex + 1} of {dummyQuestions.length}</h2>
                <button className="text-gray-400 hover:text-yellow-500 transition flex items-center gap-1 text-sm font-medium">
                  <AlertTriangle size={16} /> Mark for Review
                </button>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                {currentQuestion.text}
              </h3>

              <div className="space-y-4">
                {Object.entries(currentQuestion.options).map(([key, value]) => {
                  const isSelected = answers[currentQuestion.id] === key;
                  return (
                    <div 
                      key={key}
                      onClick={() => handleOptionSelect(key)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 hover:border-primary/50 bg-white'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {key}
                      </div>
                      <span className={`text-lg font-medium ${isSelected ? 'text-primary' : 'text-gray-700'}`}>
                        {value}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Next/Prev Buttons */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t">
                <button 
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                <button 
                  onClick={() => setCurrentQIndex(prev => Math.min(dummyQuestions.length - 1, prev + 1))}
                  disabled={currentQIndex === dummyQuestions.length - 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 transition shadow-lg shadow-primary/20"
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar / Question Palette (Right 1 Column) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 text-center border-b pb-4">Question Navigation</h3>
              
              <div className="grid grid-cols-5 gap-3 mb-8">
                {dummyQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm border-2 transition-all ${
                      currentQIndex === idx ? 'border-primary ring-2 ring-primary/20' : 
                      isAnswered(q.id) ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-3 mb-8 text-sm">
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500"></div> <span className="text-gray-600 font-medium">Answered ({Object.keys(answers).length})</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-white border-2 border-gray-200"></div> <span className="text-gray-600 font-medium">Unanswered ({dummyQuestions.length - Object.keys(answers).length})</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 rounded border-2 border-primary"></div> <span className="text-gray-600 font-medium">Current Question</span></div>
              </div>

              <button 
                onClick={manualSubmit}
                className="w-full py-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} /> Submit Exam
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default LiveExam;
