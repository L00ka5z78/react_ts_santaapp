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
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
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
                    <input style={{display: "none"}} type="file"  id="file"/>
                    <label className="write_label" htmlFor="file">Upload image...</label>
                    <div className="buttons">
                        <button>Save as draft</button>
                        <button>Update</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" name="cat" value="art" id="art"/>
                        <label className="write_label" htmlFor="art">Art</label>
                    </div>

                    <div className="cat">
                    <input type="radio" name="cat" value="science" id="science"/>
                    <label className="write_label" htmlFor="science">Science</label>
                    </div>

                    <div className="cat">
                    <input type="radio" name="cat" value="technology" id="technology"/>
                    <label className="write_label" htmlFor="technology">Technology</label>
                    </div>

                    <div className="cat">
                    <input type="radio" name="cat" value="cinema" id="cinema"/>
                    <label className="write_label" htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">

                    <input type="radio" name="cat" value="design" id="design"/>
                    <label className="write_label" htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                    <input type="radio" name="cat" value="food" id="food"/>
                    <label className="write_label" htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>

    )
}