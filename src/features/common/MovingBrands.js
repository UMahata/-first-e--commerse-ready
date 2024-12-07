import React from 'react'
import { babyposter1 } from '../../assets'

const MovingBrands = () => {
  return (
    <div >
         <header className="bg-white shadow">
          <div className=" flex  justify-center mx-auto">
          <img src={babyposter1} className='w-full object-cover' />
            
          </div>
         
          <div className='bg-slate-500 w-full h-8'>
             <p className='text-slate-50 text-lg border-slate-800 text-center'>Apply for Membership ,and get 20% instant discount on Electronics Products, Hurry, Offer Ending Soon!</p>
          </div>
        </header>
    </div>
  )
}

export default MovingBrands