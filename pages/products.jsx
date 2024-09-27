import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

    const router = useRouter();

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('https://carparts-ki7c.onrender.com/products/all');
            setProducts(response.data);
        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchText) {
            fetchAllProducts();
            return;
        }

        try {
            const response = await axios.get(`https://carparts-ki7c.onrender.com/products/${searchText}`);
            setProducts(response.data);
        } catch (err) {
            setError('Error fetching products');
        }
    };

    const clearFilter = () => {
        setSearchText('');
        fetchAllProducts();
    };

    if (loading) {
        return <div className="p-10 bg-purple-400 text-center text-xl rounded-xl">Ładuję produkty...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex justify-between p-4'>
                <h2>Produkty</h2>
                <Link href="/addproduct">
                    <button className="bg-purple-400 font-bold p-3 rounded-md">Dodaj Produkt</button>
                </Link>
                <h2>Cześć, Tomek</h2>
            </div>

            <form className="flex items-center max-w-sm mx-auto" onSubmit={handleSearch}>
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                    <input
                        type="text"
                        id="simple-search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                        placeholder="Szukaj na nazwie lub modelu..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mr-2"
                >
                    Szukaj
                </button>
                <button
                    type="button"
                    onClick={clearFilter}
                    className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300"
                >
                    Wszystkie
                </button>
            </form>

            <div className='p-4'>
                <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                    <div className='my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                        <span>Nazwa</span>
                        <span className='sm:text-left text-right'>Cena</span>
                        <span className='hidden md:grid'>Model</span>
                        <span className='hidden sm:grid'>Zdjęcie</span>
                        <span className='hidden sm:grid'>Akcje</span>
                    </div>
                    <ul>
                        {products.map(product => (
                            <li key={product.id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                                <div className='flex items-center'>
                                    <p className='pl-4'>{product.title}</p>
                                </div>
                                <p className='text-gray-600 sm:text-left text-right'>{product.price}</p>
                                <p className='hidden md:flex'>{product.model}</p>
                                <div>
                                    {product.images && product.images.length > 0 && (
                                        <div>
                                            <img src={product.images[0]} alt={product.title} width="150" />
                                        </div>
                                    )}
                                </div>
                                <div className='sm:flex hidden justify-between items-center'>
                                    <div className="justify-between">
                                        <button
                                            className="p-2 bg-blue-300 rounded-md mr-1"
                                            onClick={() => {
                                                router.push(`/product/${product.id}`);
                                            }}
                                        >
                                            Pokaż
                                        </button>
                                        <button
                                            className="p-2 bg-blue-500 rounded-md mr-1"
                                            onClick={() => router.push(`/update/${product.id}`)}
                                        >
                                            Edycja
                                        </button>
                                        <button
                                            className="p-2 bg-red-500 rounded-md"
                                            onClick={() => {
                                                const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten produkt?");
                                                if (confirmDelete) {
                                                    router.push(`/deleteproduct/${product.id}`);
                                                }
                                            }}
                                        >
                                            Usuń
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Products;
