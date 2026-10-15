import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../context/useAuth';

export default function ActivePolls() {
  const { token } = useAuth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get('/api/polls/active', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPolls(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchPolls();
  }, [token]);

  const handleVote = async (pollId, optionIndex) => {
    try {
      await axios.post(`/api/polls/${pollId}/vote`,
        { optionIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVoted({ ...voted, [pollId]: true });
      setMessage('Vote submitted successfully!');
      setTimeout(() => setMessage(''), 3000);
      const res = await axios.get('/api/polls/active', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPolls(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to vote');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
      Loading polls...
    </div>
  );

  return (
    <div>
      <h2 style={{ marginBottom: '24px', fontWeight: 'bold', fontSize: '22px' }}>
        📋 Active Polls
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
        }}>No active polls available.</div>
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
          <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>{poll.question}</h3>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
            By: {poll.createdBy?.name}
          </p>

          {poll.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleVote(poll._id, index)}
              disabled={voted[poll._id]}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: 'none',
                background: voted[poll._id]
                  ? 'rgba(255,255,255,0.5)'
                  : 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
                cursor: voted[poll._id] ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                fontSize: '15px',
                fontWeight: '500',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>{option.text}</span>
              <span style={{ color: '#ec4899', fontWeight: 'bold' }}>
                {option.votes} votes
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}