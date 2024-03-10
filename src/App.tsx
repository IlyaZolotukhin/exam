import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Home} from './Home';
import {Profile} from './Profile';
import {Login} from './Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    console.log(isAuthenticated)
  const handleLogin = () => {
      setIsAuthenticated(true);
  };

  return (
      <BrowserRouter>
        <Routes>


        </Routes>
      </BrowserRouter>
  );
};

export default App;

