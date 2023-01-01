import React from "react";
import {Link} from "react-router-dom";
import NotFound from "../utils/img/lost.jpg";

import '../index.css'

export const NotFoundView = () => (
     <>
    <h1>View not found.</h1>
         <div className="not_found">
             <img className="not_found_img" src={NotFound} alt="maze :)"/>
             <Link to="/">Go back to home page</Link>
         </div>
         <div>

         </div>
    </>

)