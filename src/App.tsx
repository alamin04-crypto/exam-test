import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Import Public & Student Pages
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import Results from './pages/Results';

// Import Protected Student Pages
import Dashboard from './pages/Dashboard';
import LiveExam from './pages/LiveExam';

// Import Admin Pages
import AdminDashboard from './admin/AdminDashboard';

// Protected Route Wrapper
const ProtectedRoute = ({ children, requireAdmin = false }: { children: JSX.Element, requireAdmin?: boolean }) => {
  const { currentUser, isAdmin, loading } = useAuth();

  // For testing purposes during UI building, you can temporarily uncomment the next line:
  // return children; 

  if (loading) return <div className="h-screen flex items-center justify-center text-primary font-bold text-xl">Loading...</div>;
  
  if (!currentUser) return <Navigate to={requireAdmin ? "/login" : "/login"} />;
  
  if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" />;

  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-light">
      <Routes>
        {/* Public Routes (সবার জন্য উন্মুক্ত) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/results" element={<Results />} />
        
        {/* Student Protected Routes (শুধুমাত্র লগইন করা স্টুডেন্টদের জন্য) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/exam/:examId" element={
          <ProtectedRoute>
            <LiveExam />
          </ProtectedRoute>
        } />
        
        {/* Admin Protected Routes (শুধুমাত্র অ্যাডমিনদের জন্য) */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* 404 Error Page (ভুল লিংকে গেলে এই পেজ দেখাবে) */}
        <Route path="*" element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-8xl font-black text-gray-200 mb-4">404</h1>
            <p className="text-2xl font-bold text-gray-700 mb-2">Page Not Found</p>
            <p className="text-gray-500 mb-6">The page you are looking for does not exist.</p>
            <a href="/" className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition">
              Go Back Home
            </a>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
