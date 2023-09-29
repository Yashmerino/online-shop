import React from 'react';

import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/auth/LoginPage';
import RegisterPage from './components/pages/auth/RegisterPage';
import ProductsContainer from './components/pages/products/ProductsContainer';
import CartContainer from './components/cart/CartContainer';
import AddProductPage from './components/pages/products/AddProductPage';
import MyProductsPage from './components/pages/products/MyProductsPage';
import MyProfilePage from './components/pages/user/MyProfilePage';
import EditProductPage from './components/pages/products/EditProductPage';

const Main = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/products' element={<ProductsContainer />} />
            <Route path='/cart' element={<CartContainer />} />
            <Route path='/product/add' element={<AddProductPage />} />
            <Route path='/profile/products' element={<MyProductsPage />} />
            <Route path='/profile' element={<MyProfilePage />} />
            <Route path='/product/edit' element={<EditProductPage />} />
        </Routes>
    );
}
export default Main;