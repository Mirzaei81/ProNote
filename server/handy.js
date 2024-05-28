const uri = `http://localhost:3000`
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im10aGVic3QxIiwicGFzc0hhc2hlZCI6IiQyYiQxMCR5cXpoQkxaVFFCUWdQVG5uZFcxMEIubjczcHdiLm9KWXdpeHVtdGdSRlBEdDFGL1pKMHBLSyIsImlkIjoyLCJpYXQiOjE3MTY5MDk2ODV9.dMKvmDG1OFa9ZLXmT5KzVNXdDp4TAhnliSArO4O664M'
"mthebst1"
"12"
//export const getNotesByTitle=  async (Token,title)=>{
//  // get allendpoint
//  try{
//  const res = await fetch(uri+'/note/'+title, {
//    method: 'GET',
//    headers: {
//      'Content-Type': 'application/json',
//      'Authorization': `Bearer ${Token}`,
//    },
//  })
//  console.log(res.status)
//    const data = await res.json()
//    console.log(JSON.stringify(data)+"api42")
//    return data
//}
//    catch(error){
//      console.error(error)
//        return {"error":error}
//    };
//}
export const updateNote = async (title, body,Token) => {
    try {
        console.log(title,token)
      const response = await fetch(uri+`/note/${title}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
        },
        body: JSON.stringify({ title, body }),
      });
      const data = await response.json();
      console.log(data)
      return {message: 'Succesfull'}
    } catch (error) {
    return {'error': error};
    }
  };
await updateNote("Test","testUpdated",token)