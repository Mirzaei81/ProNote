import { title } from "process";

const username =  'Mirzaei28'
const password = '@m1r@rsh1@'
const email = "aam.mirzaei@gmail.com"

//const data = await fetch('http://localhost:3000/register', {
//  method: 'POST',
//  headers: {
//    'Content-Type': 'application/json',
//  },
//  body: JSON.stringify({ username: username, password: password,email:email }),
//});
const data = await fetch('http://localhost:3000/login', {
  method: 'POST',                                                              
  headers: {                                                                   
    'Content-Type': 'application/json',                                        
  },
  body: JSON.stringify({ username: username, password: password,email:email }),
});
const res = await data.json()
console.log(res)
console.log(res.Token)

const data2 = await fetch('http://localhost:3000/note', {
  method: 'post',                                                              
  headers: {                                                                   
    'Content-Type': 'application/json',                                        
    'Authorization': `Bearer ${res.Token}`
  },
  body: JSON.stringify({tags:"test1,test2",title:"hello",body:"HelloWorld"}),
});
const res2 = await data2.json()
console.log(res2)

const data1 = await fetch('http://localhost:3000/note', {
  method: 'get',                                                              
  headers: {                                                                   
    'Content-Type': 'application/json',                                        
    'Authorization': `Bearer ${res.Token}`
  },
});

const res1 = await data1.json()
console.log(res1)