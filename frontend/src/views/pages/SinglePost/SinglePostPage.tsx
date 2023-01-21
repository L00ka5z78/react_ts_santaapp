import React from "react";
import './SinglePostPage.css'

export const SinglePostPage = () => {
    return (
        <div className="single_page">
            <div className="content">
                <img className="host_img" src="https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
            </div>
            <div className="user">
                <img className="alien" src="https://images.fineartamerica.com/images-medium-large-5/alien-head-sciepro.jpg" alt="picture"/>
                <div className="info">
                    <span className="user_name">Johhny</span>
                    <p>Posted 2 days ago</p>
                </div>
            </div>
            <div className="menu">Menu</div>
        </div>
    )
}