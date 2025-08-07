import React from 'react';
import './Navbar.css'; 

const Navbar = ({ query, setQuery, onSearch, cart ,setShowLogin}) => {
  return (
    <nav className="navbar">
      <h2>🛍️ MyShop</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>

      <div className="auth-cart">
        <span>🛒 Cart ({cart.length})</span>
        <button onClick={()=>setShowLogin(true)}>Login</button>
       
      </div>
    </nav>
  );
};

export default Navbar;   
