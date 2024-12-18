import { useSelector, useDispatch } from "react-redux";
import {
  allProducts,
  fetchAllProductsAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  increment,
  incrementAsync,
  selectBrands,
  selectCategories,
  selectCount,
  selectedProductListStatus,
} from "./ProductListSlice";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";
import { ITEAMS_PER_PAGE } from "../../app/constants";
import Pagination from "../common/Pagination";
import Spinner from "../common/Spinner";
import { Blocks } from "react-loader-spinner";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

export default function ProductList() {
  const dispatch = useDispatch();
  
  const products = useSelector(allProducts);
  const totalItems = useSelector((state) => state.product.totalItems);
  
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const status = useSelector(selectedProductListStatus);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // const products = useSelector((state)=>state.product.products)
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    //TODO : on server it will support multiple values
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }

    
    setFilter(newFilter);
  };
  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };
  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEAMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
   

  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
   
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
  }, []);

  return (
    <div>
    
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition show={mobileFiltersOpen}>
            <Dialog
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <TransitionChild
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <div className="fixed inset-0 z-40 flex">
                <TransitionChild
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </DisclosureButton>
                              </h3>
                              <DisclosurePanel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        onChange={(e) => {
                                          handleFilter(e, section, option);
                                        }}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </DisclosurePanel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </Transition>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </MenuButton>
                  </div>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option.name}>
                            {({ focus }) => (
                              <p
                                onClick={(e) => handleSort(e, option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-4 lg:pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <SideFilter filters={filters} handleFilter={handleFilter} />

                {/* Product grid */}
                <ProductGrid products={products} status={status}/>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Pagination
        handlePage={handlePage}
        page={page}
        setPage={setPage}
        totalItems={totalItems}
        ITEAMS_PER_PAGE={15}
      />
    </div>
  );
}

const SideFilter = ({ filters, handleFilter }) => {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open}) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                    
                  </span>
                  <span className="ml-6 flex items-center">
                    {!open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              {!open && <div className="pt-6">
              <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={optionIdx} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => {
                          handleFilter(e, section, option);
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>}
              {/* <DisclosurePanel className="pt-6">
                
              </DisclosurePanel> */}
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};


const ProductGrid = ({ products,status }) => {
  return (
    <div className="lg:col-span-3 ">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 lg:py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        {status ==="loading"?<Blocks
        height="80"
        width="80"
        color="rgb(79, 70, 229)"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        className="mx-auto"
        visible={true}
        />:null}
          <div className="mt-0 lg:mt-6  grid  grid-cols-2 gap-x-2 gap-y-4 lg:gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
       
            {products.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <div
                  key={product.id}
                  className="group p-1 relative border-solid border-2 rounded-lg"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.thumbnail}
                      alt={product.images}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>

                  <div className="mt-4 flex justify-between pl-1 pr-1 pb-2">
                    <div>
                      <div className="text-sm text-gray-700 mr-2">
                        <p href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </p>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <StarIcon className="h-5 inline" />
                        <p className="inline align-bottom">{product.rating}</p>
                      </div>
                      {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                    </div>
                    <div>
                      <p className="text-sm block font-medium text-gray-900 ">
                        $
                        {Math.round(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>
                      <p className="text-sm block line-through font-medium text-gray-400">
                        ${Math.round(product.price)}
                      </p>
                    </div>
                  </div>
                  { product.deleted && <div>
                    <p className="text-sm text-red-400">Product Deletd</p>
                   </div>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
