const uri = `http://localhost:3000/user/register`
 const data = await fetch(uri,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json' // Set the Content-Type header
      },
      body:JSON.stringify({username:"mthebst", password:"12",email:"amir"}),
    })
    console.log(await data.text())