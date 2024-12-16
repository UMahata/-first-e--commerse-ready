import { baseUrl } from "../../urls";

// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  
  return new Promise( async(resolve) =>{
    
    
    const response = await fetch(`${baseUrl}/products`)
    const data = await response.json()
    resolve({data})
  }
    
  );
}
 export function createProduct(product){
    return new Promise(async (resolve)=>{
      const response = await fetch(`${baseUrl}/products/`,{
        method:'POST',
        body: JSON.stringify(product),
        hearders: {'content-type': 'application/json'},
      })
      const data= await response.json()
      resolve({data})
    })
 }

 export function updateProduct(update) {
  return new Promise( async(resolve) =>{
    const response = await fetch(`${baseUrl}/products/`+update.id,{
      method: "PATCH",
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'} 
    })
    const data = await response.json()
    resolve({data})
  }
    
  );
}


export function fetchCategories() {
 
  return new Promise( async(resolve) =>{
    const response = await fetch(`${baseUrl}/categories`)
    const data = await response.json()
    resolve({data})
  }
    
  );
}
export function fetchBrands() {
  
  return new Promise( async(resolve) =>{
    const response = await fetch(`${baseUrl}/brands`)
    const data = await response.json()
    resolve({data})
  }
    
  );
}
export function fetchProductById(id) {
  return new Promise( async(resolve) =>{
    const response = await fetch(`${baseUrl}/products/`+id)
    const data = await response.json()
    resolve({data})
   
  }
    
  );
}
export function fetchProductsByFilters(filter,sort,pagination) {
    //filter = {"category":["smartphone","laptop"]}
    //sort = {_sort:"price",_order="desc"}
  //TODO : on server it will support multiple values
  //pagination ={_page=1,_limit=10}
  console.log(filter)
  let queryString = ''
  for(let key in filter){
    const categoryValues = filter[key]
    console.log(categoryValues)
    if(categoryValues.length>0){
        categoryValues.map((value)=>{
          console.log(value);
          queryString += `${key}=${value}&`
        })
         
    }
   
  }

   for(let key in sort){
      queryString += `${key}=${sort[key]}&`
   }
   for(let key in pagination){
      queryString += `${key}=${pagination[key]}&`
      
   }

  return new Promise( async(resolve) =>{
   
   const url =`/products/?${queryString}`
   console.log(url)
   
   
    const response = await fetch(`${baseUrl}/products/?`+queryString)
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({ data: { products: data, totalItems: +totalItems } });
   
   
    
  }
    
  );
}
