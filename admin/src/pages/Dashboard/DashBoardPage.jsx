import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer,
} from 'recharts';
import './DashboardPage.css';

const DashboardPage = () => {
    const url = 'http://localhost:4000';
    const [orders, setOrders] = useState([]);
    const [topBeers, setTopBeers] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${url}/api/order/getAll`);
                if (res.data.success) {
                    const ordersData = res.data.orders;
                    setOrders(ordersData);

                    // Calculate monthly sales totals
                    const salesByMonth = {};
                    ordersData.forEach(order => {
                        const month = new Date(order.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
                        salesByMonth[month] = (salesByMonth[month] || 0) + order.amount;
                    });
                    setMonthlySales(Object.entries(salesByMonth).map(([month, total]) => ({ month, total })));

                    // Top beers by quantity
                    const beerMap = {};
                    ordersData.forEach(order => {
                        order.items.forEach(item => {
                            beerMap[item.name] = (beerMap[item.name] || 0) + item.quantity;
                        });
                    });
                    const sortedBeers = Object.entries(beerMap)
                        .map(([name, quantity]) => ({ name, quantity }))
                        .sort((a, b) => b.quantity - a.quantity)
                        .slice(0, 5);
                    setTopBeers(sortedBeers);

                    // Beer category distribution
                    const categoryCount = {};
                    ordersData.forEach(order => {
                        order.items.forEach(item => {
                            const category = item.category || 'Unknown';
                            categoryCount[category] = (categoryCount[category] || 0) + item.quantity;
                        });
                    });
                    setCategoryData(Object.entries(categoryCount).map(([name, value]) => ({ name, value })));
                }
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            }
        };

        fetchOrders();
    }, []);

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d99e30', '#ff6f61', '#8dd1e1'];

    return (
        <div className="dashboard-page">
            <h2>Admin Dashboard</h2>

            <div className="chart-section">
                <div className="chart-card">
                    <h3>Monthly Sales (RON)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlySales}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#d99e30" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Top 5 Best-Selling Beers</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart layout="vertical" data={topBeers}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" tick={{ fontSize: 13 }} />
                            <Tooltip />
                            <Bar dataKey="quantity" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Beer Category Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
