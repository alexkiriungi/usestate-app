import React, { useState } from 'react';

function Product({ name, price, inventory, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    if (inventory < quantity) {
      alert(`Sorry, we only have ${inventory} items in stock.`);
    } else {
      onAddToCart({ name, price, quantity });
    }
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{price}</p>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={handleQuantityChange} />
      </label>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(
      (p) => p.name === product.name && p.price === product.price
    );

    if (existingProduct) {
      setCart(
        cart.map((p) =>
          p.name === product.name && p.price === product.price
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        )
      );
    } else {
      setCart([...cart, product]);
    }
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <div>
      <Product
        name="Product 1"
        price="$10"
        inventory={5}
        onAddToCart={handleAddToCart}
      />
      <Product
        name="Product 2"
        price="$20"
        inventory={3}
        onAddToCart={handleAddToCart}
      />
      <h2>Cart ({getTotalItemsInCart()})</h2>
      <ul>
        {cart.map((product) => (
          <li key={`${product.name}-${product.price}`}>
            {product.name} - {product.price} - Quantity: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
