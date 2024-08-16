import React, { useEffect, useState } from 'react'
// import { ITEAMS_PER_PAGE } from '../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../Order/orderSlice';
import Pagination from '../common/Pagination';

const AdminOrders = () => {
       const [page, setPage] = useState(1);
       const dispatch = useDispatch()
       const orders = useSelector(selectOrders)
       const totalOrdersNumber = useSelector(selectTotalOrders)
       const [editableOrderId,setEditableOrderId]= useState(-1)
       
       
      
       
 
     
       
       const handleEdit=(order)=>{
        setEditableOrderId(order.id)
       
       }
       
       const handleUpdate=(e,order)=>{
        const updateOrder = {...order,status:e.target.value}
        dispatch(updateOrderAsync(updateOrder))
        setEditableOrderId(-1)
       }
       const handlePage=(page)=>{
        setPage(page)
         const pagination = { _page: page, _per_page: 5 };
        dispatch(fetchAllOrdersAsync(pagination));
       }



    useEffect(() => {
        

        const pagination = { _page: page, _per_page: 5 };
        dispatch(fetchAllOrdersAsync(pagination));
      }, [dispatch,page]);



  return (
  <div className='mx-auto max-w-7xl '>
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
      {orders.map((order)=>(
        order.cartItems.map((item)=>(<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              key ={item.id} 
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {<img className='h-10 rounded-full inline mr-2 ' src={item.thumbnail}alt="" />}{item.title}
            </th>
            <td className="px-10 py-4 ">{item.id}</td>
            <td className="px-6 py-4">{order.totalAmount.toFixed(2)}</td>
            {editableOrderId === order.id? 
             ( <select name="" id="" onChange={e=>handleUpdate(e,order)}>
                <option value="pending">Pending</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>):
              (<td className="px-6 py-4">{order.status}</td>) 
            }
            <td className="px-6 py-4">
              <div
                href="#"
                onClick={e=>handleEdit(order)}
                className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </div>
             
            </td>
          </tr>))
      ))}
      
    </tbody>
  </table>
   </div>
   <Pagination
        handlePage={handlePage}
        page={page}
        setPage={setPage}
        totalItems={totalOrdersNumber}
        ITEAMS_PER_PAGE={5}
      />
     
  </div> 

  )
}

export default AdminOrders
