import React, { useEffect, useState, useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const [beerList, setBeerList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/beer/list");
        setBeerList(res.data.data); // adaptează dacă e altă structură
      } catch (err) {
        console.error("Eroare la încărcarea berilor:", err.message);
      }
    };
    fetchBeers();
  }, []);

  return (
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {beerList.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                  <div key={item._id}>
                    <div className="cart-items-title cart-items-item">
                      <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
                      <p>{item.name}</p>
                      <p>{item.price} RON</p>
                      <p>{cartItems[item._id]}</p>
                      <p>{item.price * cartItems[item._id]} RON</p>
                      <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                    </div>
                    <hr />
                  </div>
              );
            }
            return null;
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount(beerList)} RON</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>2 RON</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <p>{getTotalCartAmount(beerList) + 2} RON</p>
              </div>
            </div>
            <button className="checkout" onClick={() => navigate("/order")}>
              Checkout
            </button>
          </div>
        </div>
      </div>
  );
};

export default Cart;
