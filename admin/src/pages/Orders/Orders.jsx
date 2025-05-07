import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error('Eroare la încărcarea comenzilor:', err);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="orders-page">
            <h2>Comenzi</h2>
            <div className="orders-list">
                {orders.length === 0 ? (
                    <p>Nu există comenzi înregistrate.</p>
                ) : (
                    orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <p><strong>Client:</strong> {order.customerName}</p>
                            <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            <p><strong>Total:</strong> {order.total} RON</p>
                            <p><strong>Beri comandate:</strong></p>
                            <ul>
                                {order.beers.map((beer, index) => (
                                    <li key={index}>{beer.name} — {beer.quantity} buc</li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
