import React from 'react'
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import {Routes, Route} from "react-router-dom";
import AddBeer from "./pages/Add/AddBeer";
import ListBeer from "./pages/List/ListBeer.jsx";
import Orders from "./pages/Orders/Orders.jsx";

const App = () =>{
    return (
        <div>
            <Navbar />
            <hr />
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path="/add" element={<AddBeer />} />
                    <Route path="/list" element={<ListBeer />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
