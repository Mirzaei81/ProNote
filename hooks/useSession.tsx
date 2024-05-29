import React, { useEffect, useState } from 'react';
import { useStorageState } from './useStorageState';
import { Login, register } from '@/types';
import  Constants from "expo-constants"
if (!Constants?.expoConfig?.hostUri) throw "Couldnot get the host uri"
const address = Constants.expoConfig.hostUri.split(`:`).shift()
const port= process.env.EXPO_PUBLIC_PORT 
const uri = `http://${address}:${port}`
const timeout = process.env.EXPO_PUBLIC_TIMEOUT||3000
const logIn= async (username:string,password:string):Promise<{message?:string,error?:string}>=>{
  try{
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), Number(timeout));

    const data = await fetch(uri + '/user/login', {
      method: 'POST',
      signal:controller.signal,
      headers: {
        'Content-Type': 'application/json' // Set the Content-Type header
      },
      body: JSON.stringify({ username: username.trim(), password: password.trim() }),
    })
    clearTimeout(id)
    let res: Login = await data.json()
    if (data.status === 401) {
      return { "error": res.error }
    }
    return { "message": res.Token }
  }catch (e){
    console.log(e)
      return {"error":"Could not connect to server please Restart the server"}
  }
}
const signIn = async (username:string,password:string,email:string):Promise<{message?:string,error?:string}>=>{
  try{
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), Number(timeout));

    const data = await fetch(uri+'/user/register',{
      method:'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json' // Set the Content-Type header
      },
      body:JSON.stringify({username: username, password: password,email:email }),
    })
    clearTimeout(id)
    let  res:register=  await data.json()
    if(data.status===409){
      return {"error":res.error}
    }
    return  {"message":res.Token}
  }catch (e){
      return {"error":"Could not connect to server please Restart the server" }
  }
}
type AuthContextProps={
  logIn: (username:string,password:string) => Promise<{message?:string,error?:string}>|null;
  signIn: (username:string,password:string,email:string) =>Promise<{message?:string,error?:string}>|null;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}
const AuthContext = React.createContext<AuthContextProps>({
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
  return (
    <AuthContext.Provider
      value={{
        signIn:async(username,password,email) => {
          // Perform sign-in logic here
          const res = await signIn(username,password,email)
          if (res.hasOwnProperty("error")){
            return res
          }
          setSession(res.message!);
          return {"message":"successfull"}
        },
        signOut: () => {
          setSession(null);
        },
        logIn:async (username:string,password:string)=>{
          const res = await logIn(username,password)
          if (res.hasOwnProperty("error")){
            return res
          }
          setSession(res.message!)
          return {"message":"successfull"}
        },
        session:session,
        isLoading:isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
