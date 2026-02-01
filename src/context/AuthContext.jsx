import { createContext, useEffect, useState } from "react";
import { getLoggedInUserData } from "../services/auth";

export const AuthContext  = createContext()

export default function AuthContextProvider({children}){
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null)
  const [userData, setUserData] = useState(null)

  async function getUserData(){
    const res = await getLoggedInUserData()
    if(res.message == 'success'){
      setUserData(res.user)
    }
  }
  useEffect(() => {
    if(isLoggedIn){
      getUserData()
    }else{
      setUserData(null)
    }
  }, [isLoggedIn])
  return <AuthContext.Provider value={{isLoggedIn , setIsLoggedIn , userData , setUserData}}>
    {children}
    </AuthContext.Provider>
}

