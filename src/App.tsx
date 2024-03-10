import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home} from './Home';
import {Profile} from './Profile';
import {Login} from './Login';
import {Dashboard} from "./Dashboard";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    console.log(isAuthenticated)
    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <div>

            <BrowserRouter>
                <Routes>
                    <Route element={<Home/>} path={'/'}>
                    <Route index element={<div>NO PAGE IS SELECTED</div>} path={'/'}/>
                    <Route element={<Profile/>} path={'/profile'}/>
                    <Route element={<Dashboard/>} path={'/dashboard'}/>
                    <Route element={<Login handleLogin={handleLogin}/>} path={'/login'}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

    );
};

export default App;

