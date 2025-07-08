const backendURL = 'https://fast-reminder-production.up.railway.app';

async function login(username, password) {
  const res = await fetch(`${backendURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    alert("Login bem-sucedido!");
  } else {
    alert("Erro no login.");
  }
}

async function verificarToken() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const res = await fetch(`${backendURL}/verify`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  return data.valid;
}
