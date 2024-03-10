import React, {useEffect} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";

export const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Current location is ', location)
    }, [location])

    return (
        <div>
            Home
            <nav>
                <ul>
                    <button onClick={() => navigate('profile', {replace: false})}>Profile</button>
                    <li><Link to={'dashboard'}>Dashboard</Link></li>
                </ul>
            </nav>
            <hr/>
            <Outlet/>
        </div>
    )
}