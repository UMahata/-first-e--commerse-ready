import { baseUrl } from "../../urls";

export function createUser(userData) {
  return new Promise( async(resolve) =>{
    console.log(userData)
    const response = await fetch(`${baseUrl}/auth/signup`,{
      method: "POST",
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'} 
    })
    const data = await response.json()
    
    resolve({data})
  }
    
  );
}
export function loginUser(loginInfo) {
  return new Promise( async(resolve,reject) =>{
   
    
    try{
      const response = await fetch(`${baseUrl}/auth/login`,{
        method: "POST",
        body:JSON.stringify(loginInfo),
        headers:{'content-type':'application/json'} ,
      });
      if(response.ok){
        const data = await response.json()
        resolve({data})
      }else{
        
        const err = await response.text()
        console.log(err)
    
        reject(err?'Wrong Email or Password':null)
      }
     
    }catch(err){
        reject(err)
    }  
  }
    
  );
}
export function checkAuth() {
  return new Promise( async(resolve,reject) =>{
    try{
      const response = await fetch(`${baseUrl}/auth/check`);
      if(response.ok){
        const data = await response.json()
        resolve({data})
      }else{
        
        const err = await response.text()
        console.log(err)
    
        reject(err?'Wrong Email or Password':null)
      }
     
    }catch(err){
        reject(err)
    }  
  }
    
  );
}
export function signOut(userId) {
  return new Promise( async(resolve) =>{
    
   
    resolve({data:"success"})
  }
    
  );
}



