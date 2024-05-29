import  Constants  from "expo-constants"

if (!Constants?.expoConfig?.hostUri) throw "Couldnot get the host uri"
const address = Constants.expoConfig.hostUri.split(`:`).shift()
const port= process.env.EXPO_PUBLIC_PORT 
const timeout = process.env.EXPO_PUBLIC_TIMEOUT||3000

const uri = `http://${address}:${port}`
export const getNotes=  async (Token:string)=>{
  // get allendpoint
  try{

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), Number(timeout));
  const res = await fetch(uri+'/note/', {
    signal: controller.signal,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`,
    },
  })
    const data =await res.json()
    if(res.status===401){
      return{"error":data!.message,status:res.status}
    }
    return data
}
    catch(error:any){
        return {"error":"Timeout please check server"}
    };
}
export const getNotesByTitle=  async (Token:string,title:string)=>{
  // get allendpoint
  try{

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), Number(timeout));
  const res = await fetch(uri+'/note/'+title.trim(), {
    method: 'GET',
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`,
    },
  })
    const data = await res.json()
    return data
}
    catch(error:any){
        return {"error":"Timeout please check server"}
    };
}
export const updateNote = async (id:string,title:string, body:string,Token:string) => {

    try {
    const controller = new AbortController();
    const timeoutid = setTimeout(() => controller.abort(), Number(timeout));
      const response = await fetch(uri+`/note/${id.trim()}`, {
        method: 'PUT',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
        },
        body: JSON.stringify({ title:title.trim(), body }),
      });
      clearTimeout(timeoutid)
      const data = await response.json();
      return {message: 'Succesfull'}
    } catch (error) {
    return {'error':"Timeout please check server"};
    }
  };
export const deleteNote = async (id:string,Token:string) => {
  //delete
    const controller = new AbortController();
    const Timeid = setTimeout(() => controller.abort(), Number(timeout));
  const data = await fetch(uri+`/note/${id.trim()}`, {
    method: 'DELETE',
    signal: controller.signal,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
    },
  })
  return await data.json()
    .catch((error) => {
    return {'error':"Timeout please check server"};
    });
} 
export const  postNote = async (Token:string,title:string,body:string) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), Number(timeout));
  fetch(uri+'/note/', {
    method: 'POST',
    signal: controller.signal,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
    },
    body: JSON.stringify({
      title: title.trim(),
      body: body,
    }),
  })
    .then((response) =>{clearTimeout(id); return response.json()})
    .then((data) => {
      return {message: 'Succesfull'}
    })
    .catch((error) => {
      return {'Error':"Timeout please check server"};
    });
} 