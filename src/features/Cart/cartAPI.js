import { baseUrl } from "../../urls";

export function addToCart(item) {
  return new Promise( async(resolve) =>{
    const response = await fetch(`${baseUrl}/cart`,{
      method: "POST",
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'} 
    })
    const data = await response.json()
    resolve({data})
  }
    
  );
}

export function fetchIteamsById() {
  return new Promise( async(resolve) =>{
    const response = await fetch(`${baseUrl}/cart`)
    const data = await response.json()
    resolve({data})
   
  }
    
  );
}

export function updateCart(update) {
  return new Promise( async(resolve) =>{
    const response = await fetch(`${baseUrl}/cart/`+update.id,{
      method: "PATCH",
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'} 
    })
    const data = await response.json()
    resolve({data})
  }
    
  );
}
export function deleteItemFromCart(itemId) {
  return new Promise( async(resolve) =>{
    const response = await fetch(`${baseUrl}/cart/`+itemId,{
      method: "DELETE",
      headers:{'content-type':'application/json'} 
    })
    const data = await response.json()
    
    resolve({data:itemId})
  }
    
  );
}

export function resetCart(){
  return new Promise(
    async(resolve)=>{
      const response = await fetchIteamsById()
      const items = response.data
      
      for(let item of items){
        
        await deleteItemFromCart(item.product.id)
      }
      resolve({status:'success'})
    }
  )
}
