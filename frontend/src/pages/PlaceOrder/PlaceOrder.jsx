import React, {useContext} from 'react'
import './PlaceOrder.css'
import {StoreContext} from "../../context/StoreContext.jsx";

const PlaceOrder = () => {

  const {getTotalCartAmount } = useContext(StoreContext);
  return (
    <div>
      <form className='place-order'>
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder='First Name'/>
            <input type="text" placeholder='Last Name'/>
          </div>
          <input type="email" placeholder='Email Address'/>
          <input type="text" placeholder='Street Address'/>
          <div className="multi-fields">
            <input type="text" placeholder='City'/>
            <input type="text" placeholder='State'/>
            <input type="text" placeholder='Zip Code'/>
          </div>
          <input type="phone" placeholder='Phone Number'/>
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
            <button className="checkout" >Payment</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
