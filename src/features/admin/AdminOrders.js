import React, { useEffect, useState } from 'react'
import { ITEAMS_PER_PAGE } from '../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders } from '../Order/orderSlice';

const AdminOrders = () => {
       const [page, setPage] = useState(1);
       const dispatch = useDispatch()
       const orders = useSelector(selectOrders)
       const totalOrdersNumber = useSelector(selectTotalOrders)
       console.log(orders)
       console.log(totalOrdersNumber)



    useEffect(() => {
        

        const pagination = { _page: page, _per_page: ITEAMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync(pagination));
      }, [dispatch,page]);



  return (
  <div className='mx-10'>
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Items
        </th>
        <th scope="col" className="px-6 py-3">
          Order Number
        </th>
        <th scope="col" className="px-6 py-3">
          Total Amount
        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {/* {orders.data.map((order)=>(
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          Apple MacBook Pro 17"
        </th>
        <td className="px-6 py-4">Silver</td>
        <td className="px-6 py-4">Laptop</td>
        <td className="px-6 py-4">$2999</td>
        <td className="px-6 py-4">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
        </td>
      </tr>))} */}
      
    </tbody>
  </table>
   </div>
  </div> 

  )
}

export default AdminOrders
