import React, {FormEvent, useState} from 'react';
import {CreateGiftReq, GiftEntity} from "types";
import {Spinner} from "../common/Spinner/Spinner";

import '../../index.css'

export const AddGift = () => {
    const [form, setForm] = useState<CreateGiftReq>({
        name: '',
        count: 0,
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
            const res = await fetch(`http://localhost:3001/gift`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
            });
            const data: GiftEntity = await res.json()
            setResultInfo(`${data.name} added with ${data.id} ID`)
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
        <h2>Add gift</h2>
        <p>
            <label>
                Name: <br/>
                <input
                    type="text"
                    placeholder="insert gifts name..."
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                />
            </label>
        </p>

        <p>
            <label>
                Count: <br/>
                <input
                    type="number"
                    value={form.count}
                    onChange={e => updateForm('count', Number(e.target.value))}
                />
            </label>
        </p>

        <p>
            <label>
                Description: <br/>
                <textarea
                    placeholder="please, describe..."
                    value={form.desc}
                    onChange={e => updateForm('desc', e.target.value)}
                />
            </label>
        </p>
        <button className="btn" type="submit">Add</button>
    </form>
}