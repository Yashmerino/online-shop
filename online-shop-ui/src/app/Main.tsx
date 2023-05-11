import React from 'react';

import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const Main = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
        </Routes>
    );
}
export default Main;