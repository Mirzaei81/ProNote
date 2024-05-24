import React from 'react';
import { useStorageState } from './useStorageState';
import { Login, register } from '@/types';
const logIn= async (username:string,password:string)=>{
  try{
    const data = await fetch('/login',{
      method:'POST',
      body:JSON.stringify({username: username, password: password }),
    })
    let  res:Login=  await data.json()
    return  res.Token 
  }catch (e){
      console.error(e)
      return "notFound"
  }
}
const signIn = async (username:string,password:string,email:string)=>{
  try{
    const data = await fetch('/register',{
      method:'POST',
      body:JSON.stringify({username: username, password: password,email:email }),
    })
    console.log(data)
    let  res:register=  await data.json()
    return  res.Token
  }catch (e){
      console.error(e)
      return "notFound"
  }
}
const signOut  = ()=>{

}
const AuthContext = React.createContext<{
  logIn: (username:string,password:string) => Promise<void>|null;
  signIn: (username:string,password:string,email:string) =>Promise<void>|null;
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

  return (
    <AuthContext.Provider
      value={{
        signIn:async(username,password,email) => {
          // Perform sign-in logic here
          setSession(await signIn(username,password,email));
        },
        signOut: () => {
          setSession(null);
        },
        logIn:async (username:string,password:string)=>{
          const token = await logIn(username,password)
          setSession(token)
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
