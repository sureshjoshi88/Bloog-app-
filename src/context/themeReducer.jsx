import { createContext,useContext,useState } from "react";
export const themeReducer = createContext();
export const useTheme = () => useContext(themeReducer);
export const ThemeProvider = ({children})=>{
const [theme,setTheme] = useState("light");
        return(
    <themeReducer.Provider  value={{theme,setTheme}}>
       { children}
    </themeReducer.Provider>
        )
}