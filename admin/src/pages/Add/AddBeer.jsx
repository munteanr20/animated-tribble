import React, { useState } from 'react';
import { menu_list } from '../../../../frontend/src/assets/assets.js';
import './AddBeer.css';
import axios from 'axios';

const AddBeer = () => {
    const url = "http://localhost:4000";
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', Number(formData.price));
        data.append('category', formData.category);
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            const res = await axios.post(`${url}/api/beer/add`, data);

            if (res.status === 200 || res.status === 201) {
                alert("Berea a fost adăugată cu succes!");
                setFormData({ name: '', description: '', price: '', category: '' });
                setImageFile(null);
                setPreview(null);
            } else {
                alert("Eroare la adăugare.");
            }
        } catch (err) {
            console.error(err);
            alert("Eroare de rețea.");
        }
    };

    return (
        <div className="add-beer-page">
            <h2>Adaugă o bere nouă</h2>
            <form onSubmit={handleSubmit} className="beer-form" encType="multipart/form-data">
                <input type="text" name="name" placeholder="Nume" value={formData.name} onChange={handleChange} required />
                <textarea className="no-resize" name="description" placeholder="Descriere" value={formData.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Preț" value={formData.price} onChange={handleChange} required />
                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="" disabled>Alege categoria</option>
                    {menu_list.map((item, index) => (
                        <option key={index} value={item.menu_name}>
                            {item.menu_name}
                        </option>
                    ))}
                </select>

                <label htmlFor="image-upload" className="image-upload">
                    {preview ? (
                        <img src={preview} alt="Preview" className="preview-image" />
                    ) : (
                        <span>Încarcă imagine</span>
                    )}
                </label>
                <input
                    type="file"
                    id="image-upload"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <button type="submit">Adaugă Berea</button>
            </form>
        </div>
    );
};

export default AddBeer;
