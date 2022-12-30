import React from "react";
import {NavLink} from "react-router-dom";

import Logo from '../../utils/img/smiley.png'
import './Header.css'

export const Header = () => {

    const colorOfLink = ({isActive}: {
        isActive: boolean;
    }) => ({color: isActive ? 'green' : 'red'})

    return (

        <div className="header">
            <img className="header_img" src={Logo} alt="smiley :)"/>
            <h1>SANTA APP</h1>
            <div className="links">
                <h2>MENU</h2>

                <NavLink className="link" style={colorOfLink} to="/gift"><h4>Gift</h4></NavLink>
                <NavLink className="link" style={colorOfLink} to="/child"><h4>Child</h4></NavLink>
                <NavLink className="link" style={colorOfLink} to="/"><h4>Home</h4></NavLink>
                <button>Log in</button>
            </div>



        </div>
    );
};