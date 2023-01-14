import React, {FormEvent, useState} from 'react';
import {CreateUserReq, UserEntity} from "../../../backend/types/user";
import {Spinner} from "./common/Spinner/Spinner";

import '../../index.css'
import {Link, useNavigate} from "react-router-dom";

export const AddUser = () => {
    const [form, setForm] = useState<CreateUserReq>({
        userName: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState<boolean>(false)
    const [resultInfo, setResultInfo] = useState<string | null>(null)

    const navigate = useNavigate()

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/gift`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
            });
            navigate('/login')

            const data: UserEntity = await res.json()
            setResultInfo(`${data.userName} added with this ${data.email} `)
        } finally {
            setLoading(false);

        }
    };

    if (loading) {
        return <Spinner/>
    }

    if (resultInfo !== null) {
        return <div>
            <p><strong>{resultInfo}</strong></p>
            <button onClick={() => setResultInfo(null)}>Add another one</button>
        </div>;
    }


    return <form  className="form" onSubmit={sendForm}>
        <h2>Register</h2>
        <p>
            <label>
                Username: <br/>
                <input
                    type="text"
                    placeholder="insert your name..."
                    value={form.userName}
                    onChange={e => updateForm('name', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Email: <br/>
                <input
                    type="text"
                    placeholder="email..."
                    value={form.email}
                    onChange={e => updateForm('email', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Password: <br/>
                <input
                    type="password"
                    placeholder="password..."
                    value={form.password}
                    onChange={e => updateForm('password', e.target.value)}
                />
            </label>
        </p>




        <button className="btn" type="submit">Register</button>
    </form>

    // return (
    //     <div className="auth">
    //         <h1 className="h1">Register</h1>
    //         <form className="register_form">
    //             <input required className="input_form" type="text" placeholder="username" name='username'
    //                    onChange={handleChange}/>
    //             <input required className="input_form" type="email" placeholder="email" name='email'
    //                    onChange={handleChange}/>
    // {/*            <input required className="input_form" type="password" placeholder="password" name='password'*/}
    // {/*                   onChange={handleChange}/>*/}
    // {/*            <button className="btn_log" onClick={handleSubmit}>Register</button>*/}
    // {/*            {error && <p className="p_err">{error}</p>}*/}
    //
    // {/*            <span>Already have account? <Link to="/login">Login</Link></span>*/}
    // {/*        </form>*/}
    // {/*    </div>*/}
    // {/*)*/}
}