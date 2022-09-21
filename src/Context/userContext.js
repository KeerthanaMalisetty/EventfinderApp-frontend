import { createContext, useState ,useContext} from "react";

export const userContext = createContext (
    {
        user:null,
        logIn:()=>{},
        logOut:()=>{}
    }
)

const USER ={
    name:"Login",
    isGuest:true,
}

export function UserContextProvider ({children}){
const [user,setUser] =useState(USER);

function logIn(name){
    setUser({isGuest:false,name:name})
}
function logOut(){
setUser(USER);
}
return (
    <userContext.Provider value={{user,logIn,logOut}}>

        {children}
        </userContext.Provider >
)
}

   
export function useUserContext(){
    const {user,logIn,logOut}=useContext(userContext)
    return {user,logIn,logOut};
}