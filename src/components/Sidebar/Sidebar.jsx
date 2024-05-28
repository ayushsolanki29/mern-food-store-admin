import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to={"/add"} className="sidebar-option">
          <img src={assets.add_icon} alt="add" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to={"/category"} className="sidebar-option">
          <img src={assets.stack} alt="add" />
          <p>Category</p>
        </NavLink>
        <NavLink to={"/list"} className="sidebar-option">
          <img src={assets.list} alt="add" />
          <p>List Items</p>
        </NavLink>
        <NavLink to={"/orders"} className="sidebar-option">
          <img src={assets.order_icon} alt="add" />
          <p>Orders</p>
        </NavLink>
        <NavLink to={"/users"} className="sidebar-option">
          <img src={assets.user} alt="add" />
          <p>users</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
