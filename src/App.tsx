import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Temporary Placeholders (পরবর্তী ধাপে এগুলোকে আসল পেজ দিয়ে রিপ্লেস করব)
const Home = () => <div className="p-10 text-center font-bold text-primary">Home Page Coming Soon</div>;
const StudentLogin = () => <div className="p-10 text-center">Student Login</div>;
const StudentRegister = () => <div className="p-10 text-center">Student Register</div>;
const Dashboard = () => <div className="p-10 text-center">Student Dashboard</div>;
const AdminDashboard = () => <div className="p-10 text-center">Admin Dashboard</div>;

// Protected Route Wrapper
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
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />

        {/* Student Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
