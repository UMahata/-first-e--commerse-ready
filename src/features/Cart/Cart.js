import { useSelector, useDispatch } from "react-redux";
import {  selectIteams } from "./cartSlice";
import {updateCartAsync,deleteItemFromCartAsync} from './cartSlice'
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";



export default function Cart() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true);
  const cartItems = useSelector(selectIteams)
  
  const totalAmount = cartItems.reduce((amount,iteam)=>amount+iteam.product.price*iteam.quantity,0)
  const totalItems = cartItems.reduce((total,item)=>total + item.quantity,0)
  
  
  
  function handleQuantity(e,item){
   dispatch(updateCartAsync({id:item.id, quantity:+e.target.value}))
}
 const handleRemove=(id)=>{
  dispatch(deleteItemFromCartAsync(id))
  
 }
  

 
  

  return (
    <>
      
    {cartItems.length<=0 && <Navigate to= '/' replace={true}></Navigate>}
        
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-20">
        <div className="flex justify-center">
          <h2 className="text-4xl w-5 text-center m-6">Cart</h2>
        </div>
        <hr />
        <div className="mt-8 pt-10">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.href}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${item.product.price}</p>
                        
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        Qty
                        <select
                        onChange={(e)=>handleQuantity(e,item)}
                        value={item.quantity}
                       
                        className=" ml-4">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                        {}
                      </p>

                      <div className="flex">
                        <button
                           onClick={e=>handleRemove(item.product.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex my-2 justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex my-2 justify-between text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} Items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <Link to="/checkout">
            <div className="mt-6">
              <div
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </div>
            </div>
          </Link>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
