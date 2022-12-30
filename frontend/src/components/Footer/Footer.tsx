import React from "react";

import Logo from '../../utils/img/smiley.png'
import './Footer.css'

export const Footer = () => {

    return (
        <footer className="footer">
            <img  className="footer_img" src={Logo} alt="smiley :)"/>
        <span>Made with ❤ and <b>ReactJS</b>.</span>
        </footer>
    );
};