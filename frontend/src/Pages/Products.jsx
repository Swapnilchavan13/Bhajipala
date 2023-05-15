 import React, { useState } from 'react';
 import { Link } from 'react-router-dom';

export const Products = (cartProducts) => {
    const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([
    { name: 'Tomato',prise:20, img: 'https://t4.ftcdn.net/jpg/05/37/04/61/240_F_537046123_s8JVn2NrClPQDOryhSm8jonYZPfIzPRX.jpg', quantity: 1 },
    { name: 'Baingan',prise:20, img: 'https://t4.ftcdn.net/jpg/00/69/19/09/240_F_69190946_dO9NYtUPGwAcKBR3pzeuwNkQy9bRCDbg.jpg', quantity: 1 },
    { name: 'Carrot',prise:20, img: 'https://t3.ftcdn.net/jpg/01/88/50/62/240_F_188506264_8MMq2BHoDlfoBYHDxiYsYn1KGKbGT38S.jpg', quantity: 1 },
    { name: 'Potato',prise:20, img: 'https://t3.ftcdn.net/jpg/00/41/30/10/240_F_41301053_AbLi3hlosbLajBo7lQdNyfGz9eusxY1x.jpg', quantity: 1 },
  ]);

  const handleQuantityIncrease = (index) => {
    setProducts((prevState) => {
      const updatedProducts = [...prevState];
      updatedProducts[index].quantity += 1;
      return updatedProducts;
    });
  };

  const handleQuantityDes = (index) => {
    setProducts((prevState) => {
      const updatedProducts = [...prevState];
      updatedProducts[index].quantity -= 1;
      return updatedProducts;
    });
  };
  const handleAddToCart = (product) => {
    setCartProducts((prevState) => {
      const updatedCartProducts = [...prevState];
      updatedCartProducts.push(product);
      return updatedCartProducts;
    });
    console.log(`Added ${product.name} to cart with quantity ${product.quantity}`);
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="products-container">
        {products.map((product, index) => (
          <div className="product" key={index}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Quantity: {product.quantity} Kg</p>
            <p>Amount: {product.prise *product.quantity}</p>
            <button onClick={() => handleQuantityIncrease(index)}>Increase Quantity</button>
            <button disabled={product.quantity<2} onClick={() => handleQuantityDes(index)}>Decrease Quantity</button>

            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
};