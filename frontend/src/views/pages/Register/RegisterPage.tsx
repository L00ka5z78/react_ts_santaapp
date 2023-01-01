import React from "react";
import {Link} from "react-router-dom";



export const RegisterPage = () => {
    return (
        <div >
            <h1 className="h1">Register</h1>
            <form className="login_form" action="src/views/pages/Login/LoginPage">
                <input required className="input_form" type="text" placeholder="username"/>
                <input required className="input_form" type="email" placeholder="email"/>
                <input required className="input_form" type="password" placeholder="password"/>
                <button className="btn_log">Register</button>
                <p className="p_err">Error. Show msg when error occurs</p>

                <span>Already have account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}