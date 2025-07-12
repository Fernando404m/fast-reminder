import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import "./loading.css"

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    fetch('https://fast-reminder-production.up.railway.app/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setAuthorized(data.valid);
        if (!data.valid) localStorage.removeItem('token');
      })
      .catch(() => {
        localStorage.removeItem('token');
        setAuthorized(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className='verification-div'>
      <div className='inner-ver-div'>
        <h2>🔒 Verificando...</h2>
        <div className='loading'>
          <div className='long-bar'>
            <div className='ball-1'></div>
            <div className='ball-2'></div>
          </div>
        </div>
      </div>
    </div>
  )
  if (!authorized) return <Navigate to="/login" />;
  return children
}

export default PrivateRoute;
