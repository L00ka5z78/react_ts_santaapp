import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import './RegisterPage.css'

interface InputData {
    username: string,
    email: string,
    password: string,
}


export const RegisterPage = () => {
    //register data is empty at the beginning
    const [inputs, setInputs] = useState<InputData>({
        username: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

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
            await fetch(`http://localhost:3001/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs),
            });
            navigate('/login')
        } catch (err: any) {
          setError(err.response.data)
        }
    }

    return (
        <div className="auth">
            <h1 className="h1">Register</h1>
            <form className="register_form">
                <input required className="input_form" type="text" placeholder="username" name='username'
                       onChange={handleChange}/>
                <input required className="input_form" type="email" placeholder="email" name='email'
                       onChange={handleChange}/>
                <input required className="input_form" type="password" placeholder="password" name='password'
                       onChange={handleChange}/>
                <button className="btn_log" onClick={handleSubmit}>Register</button>
                {error && <p className="p_err">{error}</p>}

                <span>Already have account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

