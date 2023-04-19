import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import './product-page.css';
import { StoreContext } from '../../context/store-context';
import { SnackbarContext } from '../../context/snackbar-context';
import { useContext } from 'react';
import { Spinner } from '../../components/spinner/spinner';

export const ProductPage = () => {

  const { addItem } = useContext(StoreContext);
  const { handleClick } = useContext(SnackbarContext);

  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const { data: item, isError } = useQuery(['product'], async () => {
    setIsLoading(true);
    return await axios.get(`https://fakestoreapi.com/products/${id}`).then(res => res.data);
  }, {
    onSuccess: () => setIsLoading(false),
    onError: () => setIsLoading(false)
  });

  if (isError || !item) {
    return <h1>Error loading data</h1>;
  }

  return (
    <div className='product-page'>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='product'>
          <div className='product-first-row'>
            <img src={item.image} alt={item.title} />
            <div className='product-info'>
              <p className='product-title'>{item.title}</p>
              <p>{item.price} €</p>
              <button className='add-to-cart-button' onClick={() => { 
                addItem(item); 
                handleClick(); 
              }}>Add to Cart</button>
            </div>
          </div>
          <div className='product-second-row'>
            <p className='product-description-title'>Product description:</p>
            <p>{item.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
