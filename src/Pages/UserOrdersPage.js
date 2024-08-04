import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import Navbar from '../features/Navbar/Navbar'

const UserOrdersPage = () => {
  return (
    <div>
      <Navbar/>
      <h1 className='mx-10 text-2xl'>My Orders</h1>
      <UserOrders/>
    </div>
  )
}

export default UserOrdersPage

