import React from 'react';
// import './App.css';
import {GiftsView} from "./views/GiftsView";
import {Route, Routes} from "react-router-dom";
import {ChildView} from "./views/ChildView";
import {Header} from "./components/Header/Header";
import {NotFoundView} from "./views/NotFoundView";
import {SingleGiftView} from "./views/SingleGiftView";
import {HomePageView} from "./views/pages/Home/HomePageView";
import {Footer} from "./components/Footer/Footer";
import {RegisterView} from "./views/pages/Register/RegisterView";
import {LoginView} from "./views/pages/Login/LoginView";
import {SinglePostPageView} from "./views/pages/SinglePost/SinglePostPageView";
import {WritePostPageView} from "./views/pages/WritePost/WritePostPageView";

export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/register" element={<RegisterView/>}/>
                <Route path="/login" element={<LoginView/>}/>
                <Route path="/gift" element={<GiftsView/>}/>
                <Route path="/" element={<HomePageView/>}/>
                <Route path="/gift/:idOfGift" element={<SingleGiftView/>}/>
                <Route path="/post/:id" element={<SinglePostPageView/>}/>
                <Route path="/write" element={<WritePostPageView/>}/>
                <Route path="/child" element={<ChildView/>}/>
                <Route path="/*" element={<NotFoundView/>}/>
            </Routes>
            <Footer/>
        </>
    );
}


