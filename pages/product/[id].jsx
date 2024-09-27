// pages/product/[id].jsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowProduct = () => {
    const router = useRouter();
    const { id } = router.query; // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`https://carparts-ki7c.onrender.com/product/${id}`);
                    setProduct(response.data);
                } catch (err) {
                    setError('Error fetching product');
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    if (loading) return <div>Ładuję...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="bg-slate-100 text-center font-semibold">
            <h1>Nazwa:  {product.title}</h1>
            <p>Marka: {product.make}</p>
            <p>Model: {product.model}</p>
            <p>Opis: {product.description}</p>
            <p>Cena: {product.price} {product.currency}</p>
            <h2 className="mt-4 mb-4">Zdjęcia:</h2>
            {product.images && product.images.length > 0 && (
                <div className="">
                    
                    {product.images.map((image, index) => (
                        <img key={index} src={image} alt={product.title} width="150" />
                        

                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowProduct;
