import React, { useState, useEffect } from 'react'

import axios from "axios"
import { toast } from "react-toastify"
import { assets } from '../../assets/assets.js'

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/listorder")
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error(response.data.message)
    }
  }
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/updatingStatus", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, [])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className='order-item' key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ","
                  }
                })}
              </p>

              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ", "} </p>
                <p>{order.address.city + ", " + order.address.country + ", " + order.address.zipcode} </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p >Items : {order.items.length}</p>
            <p className='amount'>Amount : ₹{order.amount}</p>
            <p className='amount'>Payment : {order.payment ? "Done":"Pending"}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For delivery 🚚">Out For delivery 🚚</option>
              <option value="Delivered ✅">Delivered ✅</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
