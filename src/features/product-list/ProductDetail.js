import React, { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByIdAsync, selectedProductById } from './ProductListSlice'
import { useParams } from 'react-router-dom'
import { addToCartAsync, selectIteams } from '../Cart/cartSlice'
import { selectLoggedInUser } from '../auth/AuthSlice'
import { useAlert } from "react-alert";


const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
 
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const colors= [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
]
const sizes= [
  { name: 'XXS', inStock: false },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: '2XL', inStock: true },
  { name: '3XL', inStock: true },
]
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[2])

  const dispatch = useDispatch()
  const items = useSelector(selectIteams)
  const params = useParams()
  const productData = useSelector(selectedProductById)
  console.log(productData)
  const alert = useAlert();

 

  const handleCart=(e)=>{
    e.preventDefault()
    if(!items.some(item=>item.product.id === productData.id)){
      const newItem = {product:productData.id,quantity:1}
  
     dispatch(addToCartAsync(newItem))
     alert.success('Item added to Cart !')
    }else{
    
      alert.error('Item Already added !')

    }
    
  }
  

  useEffect(()=>{
    dispatch(fetchProductByIdAsync(params.id))
  },[dispatch,params.id])


  return (
    <>
   {productData && <div className="bg-white">
      <div className="pt-6">
       

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={productData.images[0]}
              alt={productData.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            {productData.images[1] &&<div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={productData.images[1]}
                alt={productData.title}
                className="h-full w-full object-cover object-center"
              />
            </div>}
            {productData.images[2] && <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={productData.images[2]}
                alt={productData.title}
                className="h-full w-full object-cover object-center"
              />
            </div>}
          </div>
         
         
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">${productData.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        productData.rating > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0',
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{productData.rating} out of 5 stars</p>
                
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                    {colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        aria-label={color.name}
                        className={({ focus, checked }) =>
                          classNames(
                            color.selectedClass,
                            focus && checked ? 'ring ring-offset-1' : '',
                            !focus && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                          )
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ focus }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            focus ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                          )
                        }
                      >
                        {({ checked, focus }) => (
                          <>
                            <span>{size.name}</span>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  focus ? 'border' : 'border-2',
                                  'pointer-events-none absolute -inset-px rounded-md',
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <button
              onClick={handleCart}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
             
                  </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productData.title}</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{productData.description}</p>
              </div>
            </div>
            <hr className='mt-5'/>

          <div className='flex flex-wrap gap-12'>
          <div className="mt-6 border-gray-800">
              <h2 className="text-sm font-medium text-gray-900">Weight</h2>
              <div className="mt-2 space-y-6">
                <p className="text-sm text-gray-600">{productData.weight} kg</p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">Warrenty</h2>
              <div className="mt-2 space-y-6">
                <p className="text-sm text-gray-600">{productData.warrantyInformation} </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">Shipping Time</h2>
              <div className="mt-2 space-y-6">
                <p className="text-sm text-gray-600">{productData.shippingInformation} </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">Return Policy</h2>
              <div className="mt-2 space-y-6">
                <p className="text-sm text-gray-600">{productData.returnPolicy} </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">Minimum Order Quantity</h2>
              <div className="mt-2 space-y-6">
                <p className="text-sm text-gray-600">{productData.minimumOrderQuantity} </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">Return Policy</h2>
              <div className="mt-2 space-y-6">
                <p className="text-sm text-gray-600">{productData.returnPolicy} </p>
              </div>
            </div>
          </div>
            <hr className='mt-5'/>
            <div>
            <div className="space-y-6 mt-7">
                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Reviews</p>
              </div> 
            <div>
              {productData.reviews.map((review)=>(
                  <div className="mt-6">
                  <div className='flex justify-between mr-5'>
                  <h2 className="text-lg font-medium text-gray-900">{review.reviewerName}</h2>
                  <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        review.rating > rating ? 'text-gray-900' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0',
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                  </div>
                  <div className="mt-2 ">
                    <p className="text-sm font-bold text-gray-900">{review.comment} </p>
                    
                   
                    
                    
                  </div>
                  <hr className='mt-5'/>
                </div>
              ))}
            
            </div>
            </div>
            

            

          
          </div>
        </div>
      </div> 
    </div>}</>
   
  )
}

export default ProductDetail
