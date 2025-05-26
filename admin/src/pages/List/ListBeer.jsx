import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListBeers.css';

const ListBeers = () => {
    const url = "http://localhost:4000";
    const [beers, setBeers] = useState([]);

    useEffect(() => {
        const fetchBeers = async () => {
            try {
                const res = await axios.get(`${url}/api/beer/list`);
                setBeers(res.data.data);
            } catch (err) {
                console.error('Error fetching beers:', err);
            }
        };

        fetchBeers();
    }, []);

    const handleDelete = async (beerId) => {
        try {
            await axios.post(`${url}/api/beer/remove`,
                { beerId },
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            setBeers(prev => prev.filter(b => b._id !== beerId));
        } catch (err) {
            console.error("Error deleting beer:", err);
        }
    };

    return (
        <div className="list-beers-page">
            <h2>Available Beers</h2>
            <div className="beer-list">
                {beers.length === 0 ? (
                    <p>No beers available in the database.</p>
                ) : (
                    beers.map((beer) => (
                        <div className="beer-card" key={beer._id}>
                            <img src={`http://localhost:4000/images/${beer.image}`} alt={beer.name} />
                            <div className="beer-info">
                                <h3>{beer.name}</h3>
                                <p className="desc">{beer.description}</p>
                                <div className="beer-details">
                                    <p><strong>Price:</strong> {beer.price} RON</p>
                                    <p><strong>Category:</strong> {beer.category}</p>
                                </div>
                                <button className="delete-button" onClick={() => handleDelete(beer._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListBeers;
