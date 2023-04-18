import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/images/logo.png'
import { MdOutlineShoppingCart } from "react-icons/md"
import { useContext } from 'react'
import { SliderContext } from '../../context/slider-context'
import { StoreContext } from '../../context/store-context'


export const Navbar = () => {

  const { handleCartToggle } = useContext(SliderContext)
  const { getCartItemCount } = useContext(StoreContext)
  const cartItemCount = getCartItemCount();

  return (
    <div className='navbar'>
      <Link to='/'><img src={logo} alt="" className='logo'/></Link>
      <div className='collections-links'>
        <Link to='/collections/all'>All</Link>
        <Link to='/collections/men'>Men</Link>
        <Link to='/collections/women'>Women</Link>
      </div>
      <button className='cart-button' onClick={handleCartToggle}>
        <MdOutlineShoppingCart />
        { cartItemCount !== 0 && (
          <div className='cart-items-count'>{cartItemCount}</div>
        ) }
      </button>
    </div>
  )
}
