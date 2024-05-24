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
    console.log(data)
    return data
}
    catch(error:any){
        return {"error":error}
    };
}
export const updateNote = async (id:string, title:string, body:string,Token:string) => {
    try {
      const response = await fetch(uri+`/note/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
        },
        body: JSON.stringify({ title, body }),
      });
      const data = await response.json();
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
export const deleteNote = async (id:string,Token:string) => {
  //delete
  fetch(uri+`/notes/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
} 
export const  postNote = async (id:string,Token:string,tags:string,title:string,body:string) => {
  fetch(uri+'/note/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
    },
    body: JSON.stringify({
      tags: tags,
      title: title,
      body: body,
      userId: id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
} 