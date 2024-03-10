import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

type PrivateRouteProps = {
    component: React.ComponentType;
    isAuthenticated: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isAuthenticated, ...rest }) => {
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Route {...rest} element={<Component />} />;
    } else {
        navigate('/login');
        return null;
    }
};

