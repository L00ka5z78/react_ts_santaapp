import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Edit from '../../../utils/img/edit.png';
import Delete from '../../../utils/img/delete.png';
import {NavLink} from "react-router-dom";

import './WritePostPage.css'

export const WritePostPage = () => {
    const [value, setValue] = useState('');
    console.log(value)
    return (
        <div className="write_post">
            <div className="write_content">
                <input type="text" placeholder="Title"/>

                <div className="editor_container">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>
                </div>

            <div className="write_menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status</b>
                    Draft
                    </span>
                    <span>
                        <b>Visibility</b>
                    Public
                    </span>
                    <input type="text" placeholder="Choose file..." id="file"/>
                    <label htmlFor="file"></label>
                </div>
                <div className="item">I2</div>
            </div>
        </div>

    )
}