import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" className="logo" />
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <a href="">Home</a>
                <a href="">About Us</a>
                <a href="">Delivery</a>
                <a href="">Privacy Policy</a>
            </ul>
        </div>

        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>Phone number: +1-212-456-7890</li>
                <li>Email address: office@cap-de-butoi.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright &copy; 2025 Cap De Butoi. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
