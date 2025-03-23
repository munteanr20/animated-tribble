import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolorem error eaque cumque corrupti molestiae vero rerum facere ipsa nulla distinctio voluptatum aliquam, accusantium veritatis iste quia nam sapiente vel.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
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
                <li>Email address: contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright &copy; 2025 Tomato. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
