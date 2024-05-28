import { Component } from 'react';
import Login from '../page/Login/login';
import Register from '../page/Register/register';
import Home from '../page/Home/home';
import SearchPage from '../page/SearchPage/searchPage';
import BookVehicle from '../page/BookVehicle/BookVehicle';
import Checkout from '../page/Checkout/Checkout';

export const routers = {
    publicRouter: [
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/',
            component: Home,
        },
        {
            path: '/search',
            component: SearchPage,
        },
        {
            path: '/book-vehicle/:id',
            component: BookVehicle,
        },
        {
            path: '/checkout',
            component: Checkout,
        },
    ],
};
