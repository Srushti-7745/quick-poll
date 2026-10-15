import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../context/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffb6c1, #ffcba4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '48px 40px',
        width: '420px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#ec4899',
          marginBottom: '8px'
        }}>Quick Poll System</h1>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '32px'
        }}>Welcome back! Please login to your account.</p>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>{error}</div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="janedoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: 'rgba(255,255,255,0.8)',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: 'rgba(255,255,255,0.8)',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >{showPassword ? '🙈' : '👁️'}</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <input type="checkbox" />
            Remember Me
          </label>
          <span style={{
            color: '#ec4899',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            Forgot Password?
          </span>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(to right, #ec4899, #f97316)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >{loading ? 'Logging in...' : 'Login'}</button>

        <p style={{ textAlign: 'center', color: '#555' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: '#ec4899',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}