import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../UserSlice";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../auth/AuthSlice";

const UserOrders = () => {
  const dispatch = useDispatch();

  const userOrders = useSelector(selectUserOrders);
  console.log(userOrders)
  

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);
  return (
    <>
      <div>
        { userOrders && userOrders.map((order,i) => (
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-20">
              <div className="flex flex-col ">
                <h1 className="text-3xl font-bold  m-3">
                  #Order Serial : {i+1}{" "}
                </h1>

                <h4 className="text-xl font-bold  text text-red-900  ml-3">
                  #Order ID : {order.id}{" "}
                </h4>
              </div>
              <hr />
              <div className="pt-10">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
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
                            <p className="text-gray-500">Qty:{item.quantity}</p>

                            <div className="flex"></div>
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
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                  <p>Total Items in this Order</p>
                  <p>{order.totalItems} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping Address:
                </p>
                <div className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress?.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {`${order.selectedAddress?.city} , ${order.selectedAddress?.state}, ${order.selectedAddress?.country}`}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress?.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress?.email}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Phone: {order.selectedAddress?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserOrders;
