import React, {FormEvent, useState} from 'react';
import {CreateUserReq, UserEntity} from "../../../backend/types/user";
import {Spinner} from "./common/Spinner/Spinner";

import '../../src/index.css'
import {Link, useNavigate} from "react-router-dom";

export const LoginUser = () => {
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
            const res = await fetch(`http://localhost:3001/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
            });
            // navigate('/register')

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
        <h2>Login</h2>
        <p>
            <label>
                Username: <br/>
                <input
                    type="text"
                    placeholder="insert your name..."
                    value={form.userName}
                    onChange={e => updateForm('userName', e.target.value)}
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

        <button className="btn" type="submit">Login</button>
        <div>
            <span>Have NO account? <Link to="/register">Register</Link></span>
        </div>

    </form>

}