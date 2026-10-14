import React, { useState } from 'react';
import { FileText, Eye, CheckCircle, XCircle, Download } from 'lucide-react';
import { toast } from 'react-toastify';

const mockResults = [
  { id: '1', studentName: 'Al Amin', examName: 'Physics Model Test 01', score: 45, total: 50, percentage: 90, status: 'unpublished' },
  { id: '2', studentName: 'Rahim Uddin', examName: 'Physics Model Test 01', score: 38, total: 50, percentage: 76, status: 'published' },
];

const ResultManager: React.FC = () => {
  const [results, setResults] = useState(mockResults);

  const togglePublish = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'unpublished' : 'published';
    
    // UI Update (Firebase logic will be connected here)
    setResults(results.map(r => r.id === id ? { ...r, status: newStatus } : r));
    
    if (newStatus === 'published') {
      toast.success("Result Published successfully! Students can now see their marks.");
    } else {
      toast.info("Result Unpublished. Hidden from students.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-primary" /> Result Management
          </h2>
          <p className="text-sm text-gray-500">Review submitted answer sheets and publish results.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-primary/30 flex items-center gap-2 hover:bg-primary/90 transition">
          Publish All Checked
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm border-b">
              <th className="p-4 font-semibold rounded-tl-lg">Student Name</th>
              <th className="p-4 font-semibold">Exam Name</th>
              <th className="p-4 font-semibold">Score</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold rounded-tr-lg text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res) => (
              <tr key={res.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-bold text-gray-900">{res.studentName}</td>
                <td className="p-4 text-gray-600">{res.examName}</td>
                <td className="p-4 font-mono font-bold text-primary">{res.score}/{res.total} ({res.percentage}%)</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${res.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {res.status}
                  </span>
                </td>
                <td className="p-4 flex items-center justify-end gap-2">
                  <button className="p-2 text-gray-500 hover:text-primary bg-gray-100 rounded-lg transition" title="View Answer Sheet">
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => togglePublish(res.id, res.status)}
                    className={`p-2 text-white rounded-lg transition shadow-md flex items-center gap-1 text-sm font-bold ${res.status === 'published' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-green-500 hover:bg-green-600 shadow-green-500/20'}`}
                  >
                    {res.status === 'published' ? <><XCircle size={16}/> Unpublish</> : <><CheckCircle size={16}/> Publish</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultManager;
