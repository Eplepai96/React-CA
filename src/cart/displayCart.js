import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../storage';

export function Cart() {
  const [selectedItems, setSelectedItems, removeItem, clearItems] = useLocalStorage('selected_items', {});
  const navigate = useNavigate();

  const handleIncreaseQuantity = (itemId) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[itemId].quantity += 1;
      localStorage.setItem('selected_items', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleDecreaseQuantity = (itemId) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[itemId].quantity > 1) {
        updatedItems[itemId].quantity -= 1;
      } else {
        delete updatedItems[itemId];
      }
      localStorage.setItem('selected_items', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleClearCart = () => {
    clearItems();
  };

  const handlePurchase = () => {
    clearItems();
    navigate('/checkout');
  };

  const totalItems = Object.values(selectedItems).reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = Object.values(selectedItems).reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div>
      <h1>Your items</h1>
      <div className='cartItems'>
        {Object.keys(selectedItems).length > 0 ? (
          Object.entries(selectedItems).map(([itemId, item]) => (
            <div key={itemId}>
              <hr />
              <h2>{item.title}</h2>
              <div className="itemInfo">
                <p>{item.description}</p>
                <div className="itemQuantity">
                  <button className='btn-secondary' onClick={() => handleIncreaseQuantity(itemId)}>+</button>
                  <span>{item.quantity}</span>
                  <button className='btn-secondary' onClick={() => handleDecreaseQuantity(itemId)}>-</button>
                </div>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
        <div>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        {Object.keys(selectedItems).length > 0 && (
          <div>
            <button className='btn-secondary' onClick={handleClearCart}>Clear Cart</button>
            <button className='btn-primary' onClick={handlePurchase}>Purchase</button>
          </div>
        )}
      </div>
      
    </div>
  );
}

