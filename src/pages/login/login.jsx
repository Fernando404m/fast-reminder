import { useNavigate } from 'react-router-dom';
import "./login.css"

function Login() {
  const navigate = useNavigate();

  async function handleLogin (e) {
    e.preventDefault()

    const userName = document.getElementById("user-name").value
    const userPassword = document.getElementById("user-password").value
    
    await login(userName, userPassword)
    navigate('/');
  };
  async function guestLogin () {
    await login("guest", "guest")
    navigate('/');
  }

  return (
    <div className='login'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={(e) => handleLogin(e)}>
        <input id='user-name' className='inputs' type="text" placeholder='Name' min={3}/>
        <input id='user-password' className='inputs' type="password" placeholder='Senha'/>
        <button className='login-btn' type='submit'>Entrar</button>
      </form>
      <button className='guest-btn' onClick={() => guestLogin()}>Entrar como guest</button>
    </div>
  );
}

export default Login