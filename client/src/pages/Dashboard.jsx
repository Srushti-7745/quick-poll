import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../context/useAuth';

export default function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalPolls: 0,
    activePolls: 0,
    totalVotes: 0,
    myPolls: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [allPolls, myPolls] = await Promise.all([
          axios.get('/api/polls', { headers }),
          axios.get('/api/polls/my', { headers })
        ]);
        const active = allPolls.data.filter(p => p.isActive).length;
        const votes = allPolls.data.reduce((sum, p) =>
          sum + p.options.reduce((s, o) => s + o.votes, 0), 0);
        setStats({
          totalPolls: allPolls.data.length,
          activePolls: active,
          totalVotes: votes,
          myPolls: myPolls.data.length
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats();
  }, [token]);

  const cards = [
    { icon: '📋', label: 'Total Polls', value: stats.totalPolls, color: '#ec4899' },
    { icon: '✅', label: 'Active Polls', value: stats.activePolls, color: '#10b981' },
    { icon: '🗳️', label: 'Total Votes', value: stats.totalVotes, color: '#f59e0b' },
    { icon: '📝', label: 'My Created Polls', value: stats.myPolls, color: '#8b5cf6' },
  ];

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {cards.map(({ icon, label, value, color }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `${color}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>{icon}</div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color }}>{value}</div>
              <div style={{ fontSize: '13px', color: '#555' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ marginBottom: '12px', fontWeight: 'bold' }}>
          Welcome to Quick Poll System!
        </h2>
        <p style={{ color: '#555' }}>
          Use the sidebar navigation to create new polls, vote on active polls,
          and view realtime statistics. Ensure you logout securely when finished.
        </p>
      </div>
    </div>
  );
}