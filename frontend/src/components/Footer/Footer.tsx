import React from "react";
import Logo from '../../utils/img/smiley.png'
import './Footer.css'
import {Link} from "react-router-dom";

export const Footer = () => {

    return (
        <footer className="footer">
            <div>
                <Link to="/">
                <img className="footer_img" src={Logo} alt="smiley :)"/>
                </Link>
            </div>
            <span>Made with ❤ and <b>ReactJS</b>.</span>
        </footer>
    );
};