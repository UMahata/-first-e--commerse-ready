import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/product-list/ProductList'
import Footer from '../features/common/Footer'
import MovingBrands from '../features/common/MovingBrands'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <MovingBrands/>
       
            <ProductList></ProductList>
        
        <Footer/>
        

    </div>
  )
}

export default Home