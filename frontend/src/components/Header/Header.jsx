import React from "react";
import "./Header.css";

const Header = () => {
  const scrollToMenu = () => {
    const menuElement = document.getElementById("explore-menu");
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
      <div className="header">
        <div className="header-contents">
          <h2>Discover Your Perfect Brew</h2>
          <p>
            Explore our wide selection of craft beers, from crisp lagers to bold
            IPAs. Whether you're a hophead or a stout lover, we’ve got the perfect
            pour waiting for you. Raise your glass and enjoy the ultimate beer
            experience!
          </p>
          <button onClick={scrollToMenu}>Browse Beers</button>
        </div>
      </div>
  );
};

export default Header;
