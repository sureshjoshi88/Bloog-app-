import { createContext,useContext,useState } from "react";
export const themeReducer = createContext();
export const UseTheme = useContext = (themeReducer);
export const themePrivider = ({children})=>{
const [theme,setTheme] = useState("light");
    <themeReducer.Provider  value={{theme,setTheme}}>
       { children}
    </themeReducer.Provider>
}