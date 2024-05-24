export interface getPosts {
    id: number,
    tags: string,
    title: string,
    body: string,
    user_id: number
}
export interface Login{
    message:string,
    Token:string
}
export interface  register{
  message:string,
  user:Object,
  Token:string
}