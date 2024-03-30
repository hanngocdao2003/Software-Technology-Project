import { Component } from "react";
import Login from "../page/Login/login";
import Register from "../page/Register/register";
import Home from "../page/Home/home";
import SearchPage from "../page/SearchPage/searchPage";

export const routers = {
    publicRouter : [
        {
            path:  '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register,
        },{
            path: '/',
            component: Home,
        },{
            path:'/search',
            component: SearchPage
        }
    ],

}