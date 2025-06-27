import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("Server error while fetching orders.");
      console.error(error);
    }
  }

   const statusHandler = async (event, orderId) => {
       const response = await axios.post(url + "/api/order/status", {
         orderId,
         status: event.target.value
       })
       if (response.data.success) {
         await fetchAllOrders();
       }     
     } 
     

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='orders'>
      <h3>Order List</h3>
      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={index} className='orders-list-item'>
            <img src={assets.parcel_icon} alt="parcel icon" />
            <div>
              <p className='orders-list-item-name'>
                {order.items.map((item, index) => {
                  return index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `;
                })}
              </p>
              <p className='order-item-name'>
                {order.address.FirstName + " " + order.address.LastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street},</p>
                <p>{order.address.city},</p>
                <p>{order.address.state},</p>
                <p>{order.address.country} - {order.address.zipcode}</p>
              </div>
              <p className='order-item-email'>{order.address.email}</p>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹ {order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
