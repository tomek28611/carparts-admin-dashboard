// pages/deleteproduct/[id].jsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteProduct = () => {
    const router = useRouter();
    const { id } = router.query; 
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const deleteProduct = async () => {
                try {
                    await axios.delete(`https://carparts-ki7c.onrender.com/admin/products/${id}`);
                    setMessage('Wybrany Produkt usunięto pomyślnie.');
                } catch (err) {
                    setError('Coś poszło nie tak.');
                } finally {
                    setLoading(false);
                }
            };
            deleteProduct();
        }
    }, [id]);

    if (loading) return <div>Usuwam...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={() => router.push('/products')} className="p-2 bg-blue-500 text-white rounded-md">
                Wróć do listy produktów
            </button>
        </div>
    );
};

export default DeleteProduct;
