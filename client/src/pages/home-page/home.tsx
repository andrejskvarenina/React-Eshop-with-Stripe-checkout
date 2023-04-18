import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'

import men from '../../assets/images/men-home.jpg'
import women from '../../assets/images/women-home.jpg'

type Props = {}

export const Home = (props: Props) => {
  return (
    <div className='home-page'>
  <Link to='/collections/men'>
    <div className='home-page-img-div'>
      <img src={men} alt="" />
      <div className='text-overlay'>
        Men Collection
      </div>
    </div>
  </Link>
  <Link to='/collections/women'>
    <div className='home-page-img-div'>
      <img src={women} alt="" />
      <div className='text-overlay'>
        Women Collection
      </div>
    </div>
  </Link>
</div>

  )
}