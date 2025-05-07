import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
    const [beerList, setBeerList] = useState([]);

    useEffect(() => {
        const url = "http://localhost:4000"
        const fetchBeers = async () => {
            try {
                const res = await axios.get(`${url}/api/beer/list`);
                setBeerList(res.data.data);
            } catch (err) {
                console.error("Eroare la încărcarea berilor:", err);
            }
        };

        fetchBeers();
    }, []);

    return (
        <div className="food-display" id="food-display">
            <h2>Top beers near you</h2>
            <div className="food-display-list">
                {beerList.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={`http://localhost:4000/images/${item.image}`}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
