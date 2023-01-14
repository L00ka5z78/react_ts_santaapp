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
import {LoginPage} from "./views/pages/Login/LoginPage";
import {RegisterPage} from './views/pages/Register/RegisterPage';
import {UserView} from "./views/UserView";

export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/register" element={<UserView/>}/>
                {/*<Route path="/login" element={<LoginPage/>}/>*/}
                {/*<Route path="/register" element={<RegisterPage/>}/>*/}
                <Route path="/gift" element={<GiftsView/>}/>
                <Route path="/" element={<HomePageView/>}/>
                <Route path="/gift/:idOfGift" element={<SingleGiftView/>}/>
                <Route path="/child" element={<ChildView/>}/>
                <Route path="/*" element={<NotFoundView/>}/>
            </Routes>
            <Footer/>
        </>
    );
}


