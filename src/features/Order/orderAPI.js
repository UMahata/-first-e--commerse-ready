// A mock function to mimic making an async request for data
export function createOrder(order) {
  console.log('send')
  return new Promise( async(resolve) =>{
    const response = await fetch('/orders',{
      method: "POST",
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  }
    
  );
}
export function updateOrder(order) {
  return new Promise( async(resolve) =>{
    const response = await fetch('/orders/'+order.id,{
      method: "PATCH",
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  }
    
  );
}

export function fetchAllOrders(pagination) {
 let queryString= ''
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
    
 }

return new Promise( async(resolve) =>{
 const url =`/orders/?${queryString}`
 console.log(url)

  const response = await fetch('/orders/?'+queryString)
  const data = await response.json()
  const totalItems = await response.headers.get('X-Total-Count');
  
    resolve({ data: { products: data, totalItems: +totalItems } });
  
}
  
);
}
