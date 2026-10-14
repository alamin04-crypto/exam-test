import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Loader2, Save, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const AiQuestionGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    subject: '',
    chapter: '',
    difficulty: 'medium',
    questionCount: '10',
    language: 'Bengali'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWithAI = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Placeholder for Firebase Cloud Function Call
    setTimeout(() => {
      setLoading(false);
      toast.success("AI Successfully Generated Questions!");
      
      // ডামি ডেটা (জেমিনি ঠিক এই ফরম্যাটেই JSON রিটার্ন করবে)
      setGeneratedQuestions([
        {
          question: "নিচের কোনটি গতির সমীকরণ নয়?",
          options: { A: "v = u + at", B: "s = ut + 1/2 at^2", C: "v^2 = u^2 + 2as", D: "F = ma" },
          correctOption: "D",
          explanation: "F = ma হলো নিউটনের গতির দ্বিতীয় সূত্র, এটি সরাসরি গতির সমীকরণ (kinematic equation) নয়।",
          difficulty: "easy"
        }
      ]);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
          <BrainCircuit size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">AI Question Generator</h2>
          <p className="text-sm text-gray-500">Generate structured MCQs instantly using Gemini AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Input Form */}
        <div className="lg:col-span-1 border-r pr-0 lg:pr-6">
          <form onSubmit={generateWithAI} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" name="subject" required placeholder="e.g. Physics" onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chapter / Topic</label>
              <input type="text" name="chapter" required placeholder="e.g. Motion & Dynamics" onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Qs</label>
                <input type="number" name="questionCount" min="1" max="50" defaultValue="10" onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select name="difficulty" onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select name="language" onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="Bengali">Bengali</option>
                <option value="English">English</option>
              </select>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-primary text-white font-bold p-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 mt-4 shadow-lg shadow-purple-500/30">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {loading ? 'Generating AI Magic...' : 'Generate Questions'}
            </button>
          </form>
        </div>

        {/* Right Side: Generated Output Preview */}
        <div className="lg:col-span-2">
          {generatedQuestions.length === 0 ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <BrainCircuit size={48} className="mb-4 opacity-50" />
              <p>AI generated questions will appear here.</p>
              <p className="text-sm">Review, edit, and add them to your Exam Bank.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex justify-between items-center bg-green-50 text-green-700 p-3 rounded-lg border border-green-200 mb-4">
                <span className="font-semibold">Successfully generated {generatedQuestions.length} questions</span>
                <button className="flex items-center gap-1 bg-green-600 text-white px-4 py-1.5 rounded shadow hover:bg-green-700 transition text-sm font-bold">
                  <Save size={16} /> Save to Bank
                </button>
              </div>

              {generatedQuestions.map((q, idx) => (
                <div key={idx} className="p-5 border rounded-xl shadow-sm bg-white hover:border-purple-300 transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900 text-lg"><span className="text-purple-600 mr-2">Q{idx + 1}.</span> {q.question}</h3>
                    <span className={`text-xs px-2 py-1 rounded font-semibold uppercase ${q.difficulty === 'easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {Object.entries(q.options).map(([key, value]) => (
                      <div key={key} className={`p-2 rounded border ${q.correctOption === key ? 'bg-green-50 border-green-500 font-semibold' : 'bg-gray-50 border-gray-200'} flex gap-2`}>
                        <span className="text-gray-500 font-bold">{key}.</span> {value as string}
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 border border-blue-100">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiQuestionGenerator;
