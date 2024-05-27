export interface getPosts {
    id: number,
    tags: string,
    title: string,
    body: string,
    user_id: number
}
export interface Login{
    message:string,
    Token:string,
    error?:string
}
export interface  register{
  message:string,
  user:Object,
  Token:string
  error?:string,
}
export interface note{
  id: Number,
  body: string,
  tags: string,
  title:string,
  user_id:Number
}
export interface noteData{
  data:note[],
  message:string
}