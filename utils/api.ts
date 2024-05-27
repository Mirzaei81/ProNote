const address = process.env.EXPO_PUBLIC_LOCALADDRESS
const port= process.env.EXPO_PUBLIC_PORT 
const uri = `http://${address}:${port}`
export const getNotes=  async (Token:string)=>{
  // get allendpoint
  try{
  const res = await fetch(uri+'/note/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`,
    },
  })
    const data =res.json()
    return data
}
    catch(error:any){
        return {"error":error}
    };
}
export const getNotesByTitle=  async (Token:string,title:string)=>{
  // get allendpoint
  try{
  const res = await fetch(uri+'/note/'+title, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`,
    },
  })
    const data =res.json()
    return data
}
    catch(error:any){
        return {"error":error}
    };
}
export const updateNote = async (title:string, body:string,Token:string) => {
    try {
      const response = await fetch(uri+`/note/${title}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
        },
        body: JSON.stringify({ title, body }),
      });
      const data = await response.json();
      return {message: 'Succesfull'}
    } catch (error) {
    return {'error': error};
    }
  };
export const deleteNote = async (id:string,Token:string) => {
  //delete
  const data = await fetch(uri+`/note/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
    },
  })
  console.log(data.status)
  console.log((await data.text())+"api:63")
  return await data.json()
    .catch((error) => {
    return {'error': error};
    });
} 
export const  postNote = async (Token:string,title:string,body:string) => {
  fetch(uri+'/note/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
    },

    body: JSON.stringify({
      tags:"",
      title: title,
      body: body,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return {message: 'Succesfull'}
    })
    .catch((error) => {
      return {'Error': error};
    });
} 