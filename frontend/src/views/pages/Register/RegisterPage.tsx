import React, {useState} from "react";
import {Link} from "react-router-dom";

import './RegisterPage.css'


export const RegisterPage = () => {
    //register data is empty at the beginning
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    })
    /* register data is being handled in inputs fields
        e value had 'any' type and one have type it. We use React.ChangeEvent<HTMLInputElement>
        because we're typing an onChange event on an input element.
 easiest way to find out what the type of  event is, is to write the event handler inline and hover over the event parameter in the function.
        onChange={e => console.log(e.target.value)}
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    // checking if the register form works well
    // console.log(inputs);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        try{
            const res = await fetch(`http://localhost:3001/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs),

            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="auth">
            <h1 className="h1">Register</h1>
            <form className="register_form" action="src/views/pages/Login/LoginPage">
                <input required className="input_form" type="text" placeholder="username" name='username'
                       onChange={handleChange}/>
                <input required className="input_form" type="email" placeholder="email" name='email'
                       onChange={handleChange}/>
                <input required className="input_form" type="password" placeholder="password" name='password'
                       onChange={handleChange}/>
                <button className="btn_log" onClick={handleSubmit}>Register</button>
                <p className="p_err">Error. Show msg when error occurs</p>

                <span>Already have account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

