import { useState } from 'react';
import axios from 'axios';
import useAuth from '../context/useAuth';

export default function CreatePoll() {
  const { token } = useAuth();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const addOption = () => {
    if (options.length < 6) setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleCreate = async () => {
    if (!question.trim()) return setError('Please enter a question');
    if (options.some(o => !o.trim())) return setError('Please fill all options');
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/polls',
        { question, options },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Poll created successfully!');
      setQuestion('');
      setOptions(['', '']);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create poll');
    }
    setLoading(false);
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '600px'
    }}>
      <h2 style={{ marginBottom: '24px', fontWeight: 'bold', fontSize: '22px' }}>
        ➕ Create New Poll
      </h2>

      {success && (
        <div style={{
          background: '#d1fae5',
          color: '#065f46',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          textAlign: 'center'
        }}>{success}</div>
      )}

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
          Poll Question
        </label>
        <input
          type="text"
          placeholder="What is your question?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
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
          Options
        </label>
        {options.map((option, index) => (
          <div key={index} style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: 'rgba(255,255,255,0.8)',
                fontSize: '15px',
                outline: 'none'
              }}
            />
            {options.length > 2 && (
              <button
                onClick={() => removeOption(index)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#fee2e2',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >✕</button>
            )}
          </div>
        ))}

        {options.length < 6 && (
          <button
            onClick={addOption}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              border: '2px dashed #ec4899',
              background: 'transparent',
              color: '#ec4899',
              cursor: 'pointer',
              fontWeight: '600',
              marginTop: '8px'
            }}
          >+ Add Option</button>
        )}
      </div>

      <button
        onClick={handleCreate}
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
          cursor: 'pointer'
        }}
      >{loading ? 'Creating...' : 'Create Poll'}</button>
    </div>
  );
}