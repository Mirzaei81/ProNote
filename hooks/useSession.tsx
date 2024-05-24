import React, { useEffect, useState } from 'react';
import { useStorageState } from './useStorageState';
import { Login, register } from '@/types';

const address = process.env.EXPO_PUBLIC_LOCALADDRESS
const port= process.env.EXPO_PUBLIC_PORT 
const uri = `http://${address}:${port}`
const logIn= async (username:string,password:string):Promise<{message?:string,error?:string}>=>{
  try{
    const data = await fetch(uri+'/login',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json' // Set the Content-Type header
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    let  res:Login=  await data.json()
    if(data.status===401){
      return {"error":"Password Is incorrect"}
    }
    return  {"message":res.Token}
  }catch (e){
      console.error(e)
      return {"error":"An Unknown error Happend"}
  }
}
const signIn = async (username:string,password:string,email:string):Promise<{message?:string,error?:string}>=>{
  try{
    const data = await fetch(uri+'/register',{
      method:'POST',
      body:JSON.stringify({username: username, password: password,email:email }),
    })
    let  res:register=  await data.json()
    console.log(res)
    if(data.status===401){
      return {"error":"Password Is incorrect"}
    }
    return  {"message":res.Token}
  }catch (e){
      return {"error":"An Unknown error Happend" }
  }
}

const AuthContext = React.createContext<{
  logIn: (username:string,password:string) => Promise<{message?:string,error?:string}>|null;
  signIn: (username:string,password:string,email:string) =>Promise<{message?:string,error?:string}>|null;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  logIn:()=>null,
  signIn:()=>null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  console.log(session +"useSession:71")
  return (
    <AuthContext.Provider
      value={{
        signIn:async(username,password,email) => {
          // Perform sign-in logic here
          const token = await signIn(username,password,email)
          if (token.hasOwnProperty("error")){
            return token
          }
          setSession(token.message!);
          return {"message":"successfull"}
        },
        signOut: () => {
          setSession(null);
        },
        logIn:async (username:string,password:string)=>{
          const token = await logIn(username,password)
          if (token.hasOwnProperty("error")){
            return token
          }
          setSession(token.message!)
          return {"message":"successfull"}
        },
        session:session,
        isLoading:isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
