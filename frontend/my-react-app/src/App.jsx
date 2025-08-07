import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopUp1 from './components/LoginPopUp1';
import Home from './pages/Home';



const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin && <LoginPopUp1 setShowLogin={setShowLogin} />}
      <Home setShowLogin={setShowLogin} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
  