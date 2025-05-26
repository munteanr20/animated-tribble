import React, {useContext, useState} from 'react'
import './PlaceOrder.css'
import axios from 'axios'
import {StoreContext} from "../../context/StoreContext.jsx";

const PlaceOrder = () => {
  const url = "http://localhost:4000";

  const {getTotalCartAmount, token, beer_list, cartItems } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    beer_list.map((item) => {
      if(cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2
    }
    let response = await axios.post(`${url}/api/order/place`, orderData, {headers:{token}});
    if (response.data.success) {
      window.location.replace("/orders-list");
    }
    else{
      alert("Error")
    }
  }

  const isFormValid = () => {
    return Object.values(data).every((value) => value.trim() !== "");
  };

  return (
    <div>
      <form className='place-order' onSubmit={placeOrder}>
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" name="firstName" placeholder="First Name" value={data.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={data.lastName} onChange={handleChange} />
          </div>
          <input type="email" name="email" placeholder="Email Address" value={data.email} onChange={handleChange} />
          <input type="text" name="address" placeholder="Street Address" value={data.address} onChange={handleChange} />
          <div className="multi-fields">
            <input type="text" name="city" placeholder="City" value={data.city} onChange={handleChange} />
            <input type="text" name="state" placeholder="State" value={data.state} onChange={handleChange} />
            <input type="text" name="zip" placeholder="Zip Code" value={data.zip} onChange={handleChange} />
          </div>
          <input type="tel" name="phone" placeholder="Phone Number" value={data.phone} onChange={handleChange} />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2> Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p> {getTotalCartAmount()} RON</p></div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p> {getTotalCartAmount() === 0 ? 0 : 2} RON</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <p> {getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)} RON</p>
              </div>
            </div>
            <button
                className="checkout"
                type="submit"
                disabled={!isFormValid()}
                style={{ opacity: !isFormValid() ? 0.5 : 1, cursor: !isFormValid() ? "not-allowed" : "pointer" }}
            >
              Place the order
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
