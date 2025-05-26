import React, { useContext, useEffect, useState } from "react";
import "./UserOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const UserOrders = () => {
    const { token, url } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${url}/api/order/user`, {
                    headers: { token },
                });
                if (response.data.success) {
                    setOrders(response.data.orders);
                }
            } catch (err) {
                console.error("❌ Error fetching orders:", err.message);
            }
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Order</p>
                    <p>Address</p>
                    <p>Total</p>
                    <p>Date</p>
                    <p>Status</p>
                    <p>Details</p>
                </div>
                <br />
                <hr />
                {orders.length === 0 ? (
                    <p>You have not placed any orders.</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={order._id}>
                            <div className="cart-items-title cart-items-item">
                                <p>#{index + 1}</p>
                                <p>{order.address.street || order.address.address}</p>
                                <p>{order.amount} RON</p>
                                <p>{new Date(order.createdAt).toLocaleString()}</p>
                                <p><span className="status-tag">{order.status}</span></p>
                                <p>
                                    <button className="details-button" onClick={() => setSelectedOrder(order)}>View</button>
                                </p>
                            </div>
                            <hr />
                        </div>
                    ))
                )}
            </div>

            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Order Details</h2>
                        <p><strong>Name:</strong> {selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                        <p><strong>Email:</strong> {selectedOrder.address.email}</p>
                        <p><strong>Phone:</strong> {selectedOrder.address.phone}</p>
                        <p><strong>Address:</strong> {selectedOrder.address.address}, {selectedOrder.address.city}, {selectedOrder.address.state}, {selectedOrder.address.zip}</p>
                        <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                        <p><strong>Status:</strong> <span className="status-tag">{selectedOrder.status}</span></p>
                        <p><strong>Total:</strong> {selectedOrder.amount} RON</p>
                        <hr />
                        <h3>Items:</h3>
                        <ul>
                            {selectedOrder.items.map((item, i) => (
                                <li key={i}>{item.name} x{item.quantity}</li>
                            ))}
                        </ul>
                        <button className="close-button" onClick={() => setSelectedOrder(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserOrders;
