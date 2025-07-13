async function login(username, password) {
  const res = await fetch(`${backendURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
  } else {
    alert("Erro no login.");
    localStorage.removeItem("token")
  }
}
async function logout() {
  localStorage.removeItem("token")
  location.reload()
}

async function verificarToken() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const res = await fetch(`${backendURL}/verify-token`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  return data.valid;
}

async function getValidation() {
  const tokenValido = await verificarToken();
  if (!tokenValido) {
    alert("Token expirado ou inválido. Faça login novamente.");
  }
}