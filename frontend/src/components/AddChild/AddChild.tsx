import React, {FormEvent, useState} from 'react';
import {ChildEntity, CreateChildReq} from "types";
import {Spinner} from "../common/Spinner/Spinner";

import '../../index.css'


export const AddChild = () => {
    const [form, setForm] = useState<CreateChildReq>({
        name: '',
        giftId: '',
        desc: '',
    });

    const [loading, setLoading] = useState<boolean>(false)
    const [resultInfo, setResultInfo] = useState<string | null>(null)

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
            const res = await fetch(`http://localhost:3001/child`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
            });
            // window.location.reload();
            const data: ChildEntity = await res.json()
            setResultInfo(`${data.name} has been created on Santa's list`)
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


    return <form className="form" onSubmit={sendForm}>
        <h2>Add child</h2>
        <p>
            <label>
                Name: <br/>
                <input
                    type="text"
                    placeholder="insert your name..."
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                />
            </label>


        </p>
        <p>
            <label>
                Description: <br/>
                <textarea
                    placeholder="write something about yourself..."
                    value={form.desc}
                    onChange={e => updateForm('desc', e.target.value)}
                />
            </label>
        </p>
        <button className="btn" type="submit">Add</button>
    </form>
}