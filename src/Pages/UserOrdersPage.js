import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import Navbar from '../features/Navbar/Navbar'

const UserOrdersPage = () => {
  return (
    <div>
      <Navbar/>
      
      <h1 className='m-6 text-4xl font-bold text-center'>My Orders</h1>
      <hr />
      <UserOrders/>
    </div>
  )
}

export default UserOrdersPage

