import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/privateRoute';

import Home from './pages/home/home';
import Login from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App