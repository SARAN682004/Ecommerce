import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import LoginPopUp from './components/loginPopUp';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <Home setShowLogin={setShowLogin} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
  