import React, {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";

export const Posts = () => {
    const location = useLocation();

    useEffect(() => {
        console.log('Current location is ', location)
    }, [location])

    return (
        <div style={{ padding: 20 }}>
            <Outlet />
        </div>
    );
}