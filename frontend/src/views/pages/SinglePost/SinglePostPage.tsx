import React from "react";
import './SinglePostPage.css'
import Edit from '../../../utils/img/edit.png';
import Delete from '../../../utils/img/delete.png';
import {NavLink} from "react-router-dom";
import {Menu} from "../../../components/Menu/Menu";

export const SinglePostPage = () => {       //***************ADJUST STYLES FOR THIS PAGE IN CSS!!!  .single_page content
    return (
        <div className="single_page">
            <div className="content">
                <img className="host_img"
                     src="https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                     alt=""/>

                <div className="user">
                    <img className="alien"
                         src="https://images.fineartamerica.com/images-medium-large-5/alien-head-sciepro.jpg"
                         alt="picture"/>
                    <div className="info">
                        <span className="user_name">Johhny</span>
                        <p>Posted 2 days ago</p>
                    </div>
                    <div className="edit">
                        <NavLink to={'/write?edit=2'}>
                            <img className="edit_pic" src={Edit} alt=""/>

                        </NavLink>
                        <img className="edit_pic" src={Delete} alt=""/>

                    </div>
                </div>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </p>

            </div>
            <div className="menu"><Menu/></div>


        </div>

)
}