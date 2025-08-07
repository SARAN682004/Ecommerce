import React, { useState, useEffect } from 'react';
import ProductCard from '../components/productCard';
import Navbar from '../components/Navbar';
import axios from 'axios';

const API_BASE_URL = 'https://ecommerce-f8oj.onrender.com'; 

const Home = ({ setShowLogin }) => {
  const [products, setProducts] = useState([]);   
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };
  
  const handleSearch = async () => {
    if (!query.trim()) {
      fetchProducts();
      return;
    }
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/products/search?q=${query}`);
      setProducts(Array.isArray(data.results) ? data.results : []);
    } catch (error) {
      console.error("Search failed:", error);
      setProducts([]);
    }
  };

  const handleEdit = async (id, updated) => {
    try {
      const { data } = await axios.put(`${API_BASE_URL}/api/products/${id}`, updated); 
      setProducts(prev => prev.map(p => p._id === id ? data : p));
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} onSearch={handleSearch} cart={cart} setShowLogin={setShowLogin} />

      <div style={{ padding: '20px' }}>
        <h1>Products</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {Array.isArray(products) && products.map(p => (
            <ProductCard key={p._id} product={p} onEdit={handleEdit} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
