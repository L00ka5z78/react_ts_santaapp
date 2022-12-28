import React from "react";
import {NavLink} from "react-router-dom";

export const Header = () => {

    const colorOfLink = ({isActive}: {
        isActive: boolean;
    }) => ({color: isActive ? 'green' : 'red'})

    return (
    <>
        <h1>SANTA APP</h1>
        MENU: <NavLink style={colorOfLink} to="/gift">gift</NavLink> |
        <NavLink style={colorOfLink} to="/child">child</NavLink>
        <hr/>
    </>
);
};