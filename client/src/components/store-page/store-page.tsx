import React from 'react'
import { Item } from '../../types/types'
import './store-page.css'
import { StoreContext } from '../../context/store-context'
import { SnackbarContext } from '../../context/snackbar-context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md"


type Props = { items : Item[]}

export const StorePage = ({items}: Props) => {

  const { addItem } = useContext(StoreContext)
  const { handleClick } = useContext(SnackbarContext)

  if (!items) {
    return <h1>no data</h1>
  } 

  return (
    <div className='store-page'>
       {items.map((item, key) => {
        return (
          <Link key={key} to={`/product/${item.id}`} className='link'>
            <div className='item' >
              <img src={item.image} alt="" />
              <p className='item-title'>{item.title}</p>
              <p>{item.price} €</p>
              <button className='quick-add-to-cart-button' onClick={(e) => {
                e.preventDefault();
                addItem(item)
                handleClick()
              }}> <MdOutlineShoppingCart/> </button>
              
              <p className='item-hover-text'>Click on the product for more information.</p>
            </div>
          </Link>
        )
       })}
    </div>
  )
}