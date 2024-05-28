import React from 'react'
import { assets } from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={assets.logo} className='logo' alt="logo" />
      <img src={assets.profile_image} className='profile' alt="profile" />
    </div>
  )
}

export default Navbar
