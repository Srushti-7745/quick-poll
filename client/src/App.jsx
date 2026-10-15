import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import useAuth from './context/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePoll from './pages/CreatePoll';
import ActivePolls from './pages/ActivePolls';
import MyPolls from './pages/MyPolls';
import Results from './pages/Results';
import Profile from './pages/Profile';
import Layout from './components/Layout';

const Protected = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Protected><Layout /></Protected>}>
        <Route index element={<Dashboard />} />
        <Route path="create" element={<CreatePoll />} />
        <Route path="active" element={<ActivePolls />} />
        <Route path="my-polls" element={<MyPolls />} />
        <Route path="results" element={<Results />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}