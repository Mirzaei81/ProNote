import { title } from "process";

const username =  'Mirzaei28'
const password = '@m1r@rsh1@'
const email = "aam.mirzaei@gmail.com"

  try{
    const data = await fetch('http://localhost:3000/register',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json' // Set the Content-Type header
      },
      body:JSON.stringify({username: username, password: password,email:email }),
    })
    let  res=  await data.json()
    if(data.status===401){
      console.log( {"error":"Password Is incorrect"})
    }
    console.log(res)
    console.log(  {"message":res.Token})
  }catch (e){
    console.log(e)
      console.log( {"error":"An Unknown error Happend" })
  }
  
const data = await fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' // Set the Content-Type header
  },
  body: JSON.stringify({ username: username, password: password }),
})
let res = await data.json()
console.log( res )