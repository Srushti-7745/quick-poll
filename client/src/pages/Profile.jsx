import useAuth from '../context/useAuth';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div style={{
      background: 'rgba(255,255,255,0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '32px',
      maxWidth: '500px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ marginBottom: '24px', fontWeight: 'bold', fontSize: '22px' }}>
        👤 My Profile
      </h2>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, #ec4899, #f97316)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>{user?.name}</h3>
          <p style={{ color: '#666' }}>{user?.email}</p>
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', color: '#555', fontSize: '13px' }}>FULL NAME</label>
          <p style={{ fontSize: '16px', marginTop: '4px' }}>{user?.name}</p>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', color: '#555', fontSize: '13px' }}>EMAIL ADDRESS</label>
          <p style={{ fontSize: '16px', marginTop: '4px' }}>{user?.email}</p>
        </div>
        <div>
          <label style={{ fontWeight: '600', color: '#555', fontSize: '13px' }}>ROLE</label>
          <p style={{ fontSize: '16px', marginTop: '4px', textTransform: 'capitalize' }}>
            {user?.role || 'user'}
          </p>
        </div>
      </div>
    </div>
  );
}