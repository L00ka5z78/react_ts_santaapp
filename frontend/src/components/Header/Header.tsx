import React from "react";
import {NavLink} from "react-router-dom";
import './Header.css'

export const Header = () => {

    const colorOfLink = ({isActive}: {
        isActive: boolean;
    }) => ({color: isActive ? 'green' : 'red'})

    return (
    <div className="header">
        <h1>SANTA APP</h1>
        MENU: <NavLink style={colorOfLink} to="/gift">gift</NavLink> |
        <NavLink style={colorOfLink} to="/child">child</NavLink>
        <hr/>
    </div>
);
};