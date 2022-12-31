import React from "react";
import {Link} from "react-router-dom";

import './LoginPage.css'

export const LoginPage = () => {
    return (
        <div className="auth">
            <h1 className="h1">Login</h1>
            <form className="login_form" action="src/views/pages/Login/LoginPage">
                <input className="input_form" type="text" placeholder="username"/>
                <input className="input_form" type="password" placeholder="password"/>
                <button className="btn_log">Login</button>
                <p className="p_err">Error. Show msg when error occurs</p>

                <span>Have NO account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    )
}