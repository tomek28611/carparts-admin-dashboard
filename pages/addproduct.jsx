import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        title: '',
        make: '',
        model: '',
        description: '',
        price: '',
        currency: 'CZK', 
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append('product', JSON.stringify(productData));
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            await axios.post('https://carparts-ki7c.onrender.com/products/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            setProductData({
                title: '',
                make: '',
                model: '',
                description: '',
                price: '',
                currency: 'CZK',
            });
            setImages([]);
        } catch (err) {
            setError('Error adding product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl mb-4">Dodaj Produkt</h2>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">Produkt dodany pomyślnie!</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nazwa</label>
                        <input
                            type="text"
                            name="title"
                            value={productData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Marka</label>
                        <input
                            type="text"
                            name="make"
                            value={productData.make}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Model</label>
                        <input
                            type="text"
                            name="model"
                            value={productData.model}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Opis</label>
                        <textarea
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Cena</label>
                        <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Waluta</label>
                        <select
                            name="currency"
                            value={productData.currency}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded"
                        >
                            <option value="CZK">CZK</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Zdjęcia</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Dodawanie...' : 'Dodaj Produkt'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
