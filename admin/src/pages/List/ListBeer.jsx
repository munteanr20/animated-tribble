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
                console.error('Eroare la încărcarea berilor:', err);
            }
        };

        fetchBeers();
    }, []);

    return (
        <div className="list-beers-page">
            <h2>Lista berilor</h2>
            <div className="beer-list">
                {beers.length === 0 ? (
                    <p>Nu există beri în baza de date.</p>
                ) : (
                    beers.map((beer) => (
                        <div className="beer-card" key={beer._id}>
                            <img src={`http://localhost:4000/images/${beer.image}`} alt={beer.name} />
                            <div className="beer-info">
                                <h3>{beer.name}</h3>
                                <p className="desc">{beer.description}</p>
                                <p><strong>Preț:</strong> {beer.price} RON</p>
                                <p><strong>Categorie:</strong> {beer.category}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListBeers;
