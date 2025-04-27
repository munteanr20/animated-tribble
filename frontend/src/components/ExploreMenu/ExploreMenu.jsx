import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {

    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Explore our menu</h1>
            <p className="explore-menu-text">
                Refresh your senses with our selection of craft and classic beers, brewed to deliver pure joy in every sip. Each glass promises authentic flavors and perfect moments of relaxation.
            </p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                            key={index}
                            className="explore-menu-list-item"
                        >
                            <p className={category === item.menu_name ? "active" : ""}>
                                {item.menu_name}
                            </p>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
