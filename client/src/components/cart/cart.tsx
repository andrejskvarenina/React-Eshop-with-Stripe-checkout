import React, { useRef, useEffect, useCallback } from 'react';
import './cart.css';
import { GrClose } from 'react-icons/gr';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { useContext } from 'react';
import { StoreContext } from '../../context/store-context';
import { SliderContext } from '../../context/slider-context';

import { loadStripe } from '@stripe/stripe-js';


export const Cart = () => {
  
  const { cartItems, addItem, removeItem, getSubtotal } = useContext(StoreContext)
  const { showCart, handleCartToggle } = useContext(SliderContext)
  
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      event.stopPropagation();
      handleCartToggle();
    }
  }, [handleCartToggle]);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stripe = await loadStripe('pk_test_51MvqTkAj6qkmHR3QLVx1SbdY8RUBk2eFfgPoQhr633ey9wEwOX7374u6r2naf2iUagPpUqOcoxL6O1mSQHFQgHx500Hi7NJ377');
    const formData = new URLSearchParams();
    cartItems.forEach((item) => {
      formData.append("cartItems[]", JSON.stringify(item));
    });
    const response = await fetch("http://localhost:4242/create-checkout-session", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems }),
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  };
  
  useEffect(() => {
    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add("disable-pointer-events");
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("disable-pointer-events");
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("disable-pointer-events");
    };
  }, [showCart, handleClickOutside]);
  

  return (
    <div className={`modal ${showCart ? 'active' : ''}`}>
      <div ref={modalRef} className={`cart ${showCart ? 'active' : ''}`}>
        <div className="cart-header">
          <div className='cart-header-content'>
            <p>Shopping Cart</p> 
            <button className='cart-close-button' onClick={handleCartToggle}><GrClose /></button>
          </div>
        </div>
        <div className="cart-body">
          {cartItems.length === 0 ? <p className='empty-cart-message'>Your cart is empty.</p> :
            cartItems.map((item, key) => {
              return (
                <div key={key} className='cart-item'>
                  <img src={item.image} alt="" />
                  <div className='cart-item-info'>
                    <p>{item.title}</p>
                    <div className='cart-item-bottom-row'>

                      <div className='cart-quantity-handler'>
                        <button onClick={() => removeItem(item)} className='quanity-buttons'><RemoveIcon/></button>
                        <p>{item.quantity}</p>
                        <button onClick={() => addItem(item)} className='quanity-buttons'><AddIcon/></button>
                      </div>

                      <p>{item.price}</p>

                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

        { cartItems.length !== 0 && (
          <div className="cart-footer">
              <p>Free shipping on orders over 90 EUR.</p>
              <p><b>Subtotal: € {getSubtotal()}</b></p>
              <p>All orders include customs duties & taxes.</p>
              <p>Shipping calculated at checkout.</p>
              <div className='checkout-button-wrap'>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="cartItems" value={JSON.stringify(cartItems)} />
                  <button className='checkout-button' type="submit">
                    Checkout
                  </button>
                </form>
              </div>
          </div> 
          )
        }
      </div>
    </div>  
    
  );
};
