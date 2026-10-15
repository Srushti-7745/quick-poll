import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* Sidebar */}
      <div style={{
        width: '260px',
        background: 'rgba(255,255,255,0.95)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0 24px 24px 0',
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
        position: 'fixed',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 100
      }}>

        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '32px',
          paddingLeft: '8px'
        }}>
          <span style={{ fontSize: '24px' }}>📊</span>
          <span style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#ec4899'
          }}>Quick Poll</span>
        </div>

        {/* Nav Links */}
        {[
          { to: '/', label: '🏠 Home' },
          { to: '/create', label: '➕ Create Poll' },
          { to: '/active', label: '📋 Active Polls' },
          { to: '/my-polls', label: '📝 My Polls' },
          { to: '/results', label: '📊 Results' },
          { to: '/profile', label: '👤 Profile' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '8px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '15px',
              background: isActive
                ? 'linear-gradient(to right, #ec4899, #f97316)'
                : 'transparent',
              color: isActive ? 'white' : '#555',
              transition: 'all 0.2s ease'
            })}
          >
            {label}
          </NavLink>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '15px',
            color: '#ec4899',
            background: 'transparent',
            textAlign: 'left'
          }}
        >🚪 Logout</button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: '260px',
        padding: '24px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffb6c1, #ffcba4)'
      }}>

        {/* Top Bar */}
        <div style={{
          background: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '16px 24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Dashboard</span>
          <span style={{
            background: 'rgba(255,255,255,0.5)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: '500'
          }}>
            👤 {user?.name}
          </span>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
}