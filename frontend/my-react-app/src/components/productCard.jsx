import React, { useState } from 'react';

const ProductCard = ({ product, onEdit, addToCart }) => {
  
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: product.name, price: product.price, description: product.description });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(product._id, form);
    setEditMode(false);
  };  

  return (
    <div style={{ border: '10px solid gray', padding: '10px', width: '200px'  }}>
      <img src={product.image} alt={product.name} width="100%" />
      {editMode ? (
        <>
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="price" type="number" value={form.price} onChange={handleChange} />
          <textarea name="description" value={form.description} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </>   
      ) : (
        <>
          <h4>{product.name}</h4>
          <p>₹{product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
