import React from 'react'
import notFoundImage from "../Assets/Images/404.png";
import { Link } from 'react-router-dom';
export default function NavBar() {
  return (
    <div className="navBar">
        <div className="logo">
            <img src={notFoundImage} alt="logo" />
        </div>
        <div className="menu">
            <ul>
            <Link className='menuItem' to={"/"}>Projects</Link>
            <Link className='menuItem' to={"/clients"}>Clients</Link>
            <Link className='menuItem' to={"/about"}>About</Link>
            </ul>
        </div>
    </div>
  )
}
