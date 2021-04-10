import React, { useState, useEffect } from 'react';
import commerce from './lib/commerce';

import './App.css';
import {
  Products,
  Navbar,
  Cart,
} from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  console.log(products);
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => setCart(await commerce.cart.retrieve());

  const handleAddToCart = async (productId, quantity) => {
    const product = await commerce.cart.add(productId, quantity);

    setCart(product.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart} />
      <Cart cart={cart} />
    </div>
  );
};

export default App;
