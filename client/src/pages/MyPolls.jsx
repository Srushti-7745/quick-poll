import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../context/useAuth';

export default function MyPolls() {
  const { token } = useAuth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/polls/my', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setPolls(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    });
  }, [token]);

  const handleDelete = (pollId) => {
    axios.delete(`/api/polls/${pollId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setMessage('Poll deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
      setPolls(prev => prev.filter(p => p._id !== pollId));
    })
    .catch(err => {
      setMessage(err.response?.data?.message || 'Failed to delete');
      setTimeout(() => setMessage(''), 3000);
    });
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
      Loading...
    </div>
  );

  return (
    <div>
      <h2 style={{ marginBottom: '24px', fontWeight: 'bold', fontSize: '22px' }}>
        📝 My Polls
      </h2>

      {message && (
        <div style={{
          background: '#d1fae5',
          color: '#065f46',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          textAlign: 'center'
        }}>{message}</div>
      )}

      {polls.length === 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.4)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          color: '#555'
        }}>You haven't created any polls yet.</div>
      )}

      {polls.map((poll) => (
        <div key={poll._id} style={{
          background: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                {poll.question}
              </h3>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                Status: {poll.isActive ? '🟢 Active' : '🔴 Closed'} |
                Options: {poll.options.length} |
                Total Votes: {poll.options.reduce((s, o) => s + o.votes, 0)}
              </p>
              {poll.options.map((option, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: '8px',
                  marginBottom: '6px',
                  fontSize: '14px'
                }}>
                  <span>{option.text}</span>
                  <span style={{ color: '#ec4899', fontWeight: 'bold' }}>
                    {option.votes} votes
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleDelete(poll._id)}
              style={{
                marginLeft: '16px',
                padding: '10px 16px',
                borderRadius: '12px',
                border: 'none',
                background: '#fee2e2',
                color: '#dc2626',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}