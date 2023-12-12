import React from 'react'
import { Routes, Route } from 'react-router-dom';
import {ROUTES } from '../../utils/routes'

import Home from '../Home/Home';
import SingleProduct from '../Products/SingleProduct';
import SingleCategory from '../Categories/SingleCategory';
import Cart from '../Cart/Cart';
import Profile from '../Home/Profile/Profile';

const AppRoutes = () => (   
    <Routes>
        <Route index element={<Home/>}/>
        <Route path={ROUTES.PROFILE} element={<Profile/>}/>
        <Route path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
        <Route path={ROUTES.CATEGORY} element={<SingleCategory/>}/>
        <Route path={ROUTES.CART} element={<Cart/>}/>
    </Routes>)

export default AppRoutes;