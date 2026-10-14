import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './admin/AdminDashboard'; // নতুন লাইন

// আগের const AdminDashboard = ... লাইনটি মুছে ফেলুন

const ProtectedRoute = ({ children, requireAdmin = false }: { children: JSX.Element, requireAdmin?: boolean }) => {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!currentUser) return <Navigate to={requireAdmin ? "/admin/login" : "/login"} />;
  if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" />;

  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-light">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* Admin Route */}
        <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
