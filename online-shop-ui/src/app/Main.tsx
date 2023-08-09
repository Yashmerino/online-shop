import React from 'react';

import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/auth/LoginPage';
import RegisterPage from './components/pages/auth/RegisterPage';
import ProductsContainer from './components/pages/products/ProductsContainer';
import CartContainer from './components/cart/CartContainer';
import AddProductPage from './components/pages/products/AddProductPage';

const Main = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/products' element={<ProductsContainer />} />
            <Route path='/cart' element={<CartContainer />} />
            <Route path='/product/add' element={<AddProductPage />} />
        </Routes>
    );
}
export default Main;