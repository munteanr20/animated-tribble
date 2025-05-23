import React from 'react'
import './Sidebar.css'
import {assets} from "../../assets/assets.js";
import {NavLink} from "react-router-dom";
const Navbar = () => {


    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to ='/add' className="sidebar-option">
                    <img src={assets.add_icon_green} alt=""/>
                    <p> Add Items </p>
                </NavLink>
                <NavLink to ='/list' className="sidebar-option">
                    <img src={assets.add_icon_green} alt=""/>
                    <p> List Items </p>
                </NavLink>
                <NavLink to ='/orders' className="sidebar-option">
                    <img src={assets.add_icon_green} alt=""/>
                    <p> Orders </p>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
