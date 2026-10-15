import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../context/useAuth';

export default function Results() {
  const { token } = useAuth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get('/api/polls', {
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

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
      Loading results...
    </div>
  );

  return (
    <div>
      <h2 style={{ marginBottom: '24px', fontWeight: 'bold', fontSize: '22px' }}>
        📊 Poll Results
      </h2>

      {polls.length === 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.4)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          color: '#555'
        }}>No polls available.</div>
      )}

      {polls.map((poll) => {
        const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);
        return (
          <div key={poll._id} style={{
            background: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ marginBottom: '8px', fontWeight: 'bold' }}>{poll.question}</h3>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
              Total Votes: {totalVotes} | By: {poll.createdBy?.name}
            </p>

            {poll.options.map((option, index) => {
              const percentage = totalVotes > 0
                ? Math.round((option.votes / totalVotes) * 100)
                : 0;
              return (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    <span>{option.text}</span>
                    <span>{option.votes} votes ({percentage}%)</span>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: '8px',
                    height: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${percentage}%`,
                      background: 'linear-gradient(to right, #ec4899, #f97316)',
                      borderRadius: '8px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}