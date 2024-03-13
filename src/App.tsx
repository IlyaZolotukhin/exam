import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AppLayout} from "./AppLayout";

const App: React.FC = () => {
    return (
        <BrowserRouter basename={'exam'}>
                <AppLayout/>
        </BrowserRouter>
    );
};

export default App;

