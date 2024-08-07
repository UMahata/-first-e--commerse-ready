import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo, updateUserAsync } from '../UserSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { useForm } from "react-hook-form";




const UserProfile = () => {
  const user = useSelector(selectUserInfo)
   const dispatch = useDispatch()
   
   const[selectedEditIndex,setSelectedEditIndex] = useState(-1)
   const[showAddAddressForm,setShowAddAddressForm] = useState(false)

   const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();


  const handleEdit=(addressUpdate ,data,index)=>{
    const newUser = {...user,addresses:[...user.addresses]}
    newUser.addresses.splice(index,1,addressUpdate)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
  }
  const handleRemove=(e,index)=>{
    const newUser = {...user,addresses:[...user.addresses]}
    newUser.addresses.splice(index,1)
    dispatch(updateUserAsync(newUser))
  }
  const handleEditForm=(index)=>{
    setSelectedEditIndex(index)
    const address= user.addresses[index]
    setValue('name',address.name)
    setValue('email',address.email)
    setValue('phoneNumber',address.phoneNumber)
    setValue('country',address.country)
    setValue('street',address.street)
    setValue('city',address.city)
    setValue('state',address.state)
    setValue('pincode',address.pincode)
  }
  const handleAdd=(address)=>{
    const newUser = {...user,addresses:[...user.addresses,address]}
    dispatch(updateUserAsync(newUser))
    setShowAddAddressForm(false)

  }

  return (
  
         <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-20">
              <div className="flex flex-col ">
                <h1 className="text-3xl font-bold  m-3">
                  Name: {user.Name ? user.Name : 'New User'}
               
                </h1>

                <h4 className="text-xl font-bold  text text-red-900  ml-3">
                 Email address: {user.email}
                </h4>
                {user.role==="admin" && <h4 className="text-xl font-bold  text text-red-900  ml-3">
                 role: {user.role}
                </h4>}
              </div>
            
            

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <button
              onClick={e=>{setShowAddAddressForm(true);
                           setSelectedEditIndex(-1)
              }}
                    type="submit"
                    className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add New Address
               </button>
               {showAddAddressForm?
                  <div className='mb-9'>
                        <form
              
              className='mb-10'
              onSubmit={handleSubmit((data) => {
                handleAdd(data)
                reset();
              })}
            >
              <div className="space-y-12 mt-8 bg-white p-8">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                 
                  <p className="my-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>
                   <hr />
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is Required",
                          })}
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.name?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is Required",
                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message: "Email not valid",
                            },
                          })}
                          type="email"
                        
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.email?.message}</p>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phoneNumber"
                          {...register("phoneNumber", {
                            required: "Phone Number is Required",
                          })}
                          type="tel"
                         
                          autoComplete="phone number"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.phoneNumber?.message}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "Country is Required",
                          })}
                          autoComplete="country-name"
                        
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                        <p className="text-red-500">
                          {errors?.country?.message}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street is Required",
                          })}
                          id="street"
                          autoComplete="street-address"
                         
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.street?.message}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is Required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                         
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.city?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "State is Required",
                          })}
                          id="region"
                          autoComplete="address-level1"
                        
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.state?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Pin Code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "Pin Code is Required",
                          })}
                          id="postal-code"
                          autoComplete="postal-code"
                         
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.pincode?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                  onClick={e=>setShowAddAddressForm(false)

                  }
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save Address
                  </button>
                </div>

              </div>
              <hr />
            </form>
                  </div> : null}
                
                <p className="mt-0.5 text-sm text-gray-500">
                  Your Addresses:
                </p>
                {user.addresses.map((address,index)=>
                    <div>
                      {selectedEditIndex === index?
                      <form
              noValidate
              onSubmit={handleSubmit((data) => {
                handleEdit(data,index)
                // dispatch(
                //   updateUserAsync({
                //     ...user,
                //     addresses: [...user.addresses, data],
                //   })
                // );
                reset();
              })}
            >
              <div className="space-y-12 mt-8 bg-white p-8">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is Required",
                          })}
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.name?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is Required",
                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message: "Email not valid",
                            },
                          })}
                          type="email"
                        
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.email?.message}</p>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phoneNumber"
                          {...register("phoneNumber", {
                            required: "Phone Number is Required",
                          })}
                          type="tel"
                         
                          autoComplete="phone number"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.phoneNumber?.message}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "Country is Required",
                          })}
                          autoComplete="country-name"
                        
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                        <p className="text-red-500">
                          {errors?.country?.message}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street is Required",
                          })}
                          id="street"
                          autoComplete="street-address"
                         
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.street?.message}
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is Required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                         
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.city?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "State is Required",
                          })}
                          id="region"
                          autoComplete="address-level1"
                        
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">{errors?.state?.message}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Pin Code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "Pin Code is Required",
                          })}
                          id="postal-code"
                          autoComplete="postal-code"
                         
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-red-500">
                          {errors?.pincode?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                  onClick={e=>setSelectedEditIndex(-1)}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save Address
                  </button>
                </div>

              </div>
            </form> : null}
                      <div className="flex justify-between gap-x-6 p-5  mt-2 border-2 ">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address?.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {`${address?.city} , ${address?.state}, ${address?.country}`}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address?.pincode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {address?.email}
                      </p>
  
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Phone: {address?.phoneNumber}
                      </p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <button
                           onClick={e=>handleEditForm(index)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Edit
                        </button>
  
                        <button
                           onClick={e=>handleRemove(e,index)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                    </div>
                  </div>
                    </div>
                    
                )}
                
              </div>
            </div>
          </div>
    
  )
}

export default UserProfile
