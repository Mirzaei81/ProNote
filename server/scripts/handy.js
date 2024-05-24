import { title } from "process";

const username =  'Mirzaei28'
const password = '@m1r@rsh1@'
const email = "aam.mirzaei@gmail.com"

const data = await fetch('http://192.168.163.116:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' // Set the Content-Type header
  },
  body: JSON.stringify({ username: username, password: password }),
})
let res = await data.json()
console.log( res.Token )