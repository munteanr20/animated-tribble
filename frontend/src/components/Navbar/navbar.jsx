import React, {useContext, useState} from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext.jsx";

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { cartItems, token, setToken } = useContext(StoreContext);
    const { userDetails } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <div className='navbar'>
            <Link to='/' className="logo"><img src={assets.logo} alt="" /></Link>

            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>Contact us</a>
            </ul>

            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={Object.keys(cartItems).length > 0 ? "dot" : ""}></div>
                </div>

                {!token ? (
                    <button onClick={() => setShowLogin(true)}>sign in</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={() => navigate("/orders-list")}>
                                <img src={assets.bag_icon} alt="" />
                                <p>Orders</p>
                            </li>

                            {userDetails?.isAdmin === "true" && (
                                <>
                                    <hr />
                                    <li onClick={() => window.location.href = "http://localhost:5174/"}>
                                        <img src={assets.dashboard_icon || assets.profile_icon} alt="" />
                                        <p>Admin</p>
                                    </li>
                                </>
                            )}

                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
