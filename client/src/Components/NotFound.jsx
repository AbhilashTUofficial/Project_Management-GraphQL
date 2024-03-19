import React from 'react'
import {Link} from "react-router-dom";
import notFoundImage from "../Assets/Images/404.png"
function NotFoundPage() {
  return (
    <div className='app-container'>
        <div className="notFoundContainer">
            <div className="image">
                <img src={notFoundImage} alt="" />
            </div>
            <div className="content">
                <div className="notFound">
                    404
                </div>
                Page is not Found, Go back to Home.
                <div className="goHome">
                    <Link className='btn' to="/">Home</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFoundPage