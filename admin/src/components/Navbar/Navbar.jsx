import React from 'react'
import './Navbar.css'
import {assets} from "../../assets/assets.js";
import { Link } from 'react-router-dom';


const Navbar = () => {


    return (
        <div className='navbar'>
            <img className ='logo' src={assets.logo} alt="Reptilus" />
            <Link to='/'>
                <p>Admin Panel</p>
            </Link>
            <img className='profile' src={assets.profile_icon} alt="" />

        </div>
    )
}

export default Navbar
