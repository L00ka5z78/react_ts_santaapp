import React from "react";
import {Link, NavLink, redirect, useNavigate} from "react-router-dom";

import Logo from '../../utils/img/smiley.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Header.css'

export const Header = () => {

    let navigate = useNavigate();
    const routeChange = () =>{
        const path = '/register';
        navigate(path);
    }

    const showToast = () => {
        toast.success("Success message")
    };

    const colorOfLink = ({isActive}: {
        isActive: boolean;
    }) => ({color: isActive ? 'green' : 'red'})

    return (

        <div className="header">
            <div className="logo">
                <Link to="/">
                    <img className="header_img" src={Logo} alt="smiley :)"/>
                </Link>
                <ToastContainer />
            </div>

            <h1>SANTA APP</h1>
            <div className="links">
                <h2>MENU</h2>

                <NavLink className="link" style={colorOfLink} to="/gift"><h4>Gift</h4></NavLink>
                <NavLink className="link" style={colorOfLink} to="/child"><h4>Child</h4></NavLink>
                <NavLink className="link" style={colorOfLink} to="/"><h4>Home</h4></NavLink>
                <button onClick={routeChange}  >Log in</button>
            </div>



        </div>
    );
};