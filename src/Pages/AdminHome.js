import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductList from '../features/admin/AdminProductList'
import Footer from '../features/common/Footer'
import MovingBrands from '../features/common/MovingBrands'

const AdminHome = () => {
  return (
    <div>
        <Navbar/>
        <MovingBrands/>
         <AdminProductList></AdminProductList>
       
      
        <Footer/>

    </div>
  )
}

export default AdminHome