
"use client"

import { createContext, useState } from "react";

export const ThemeContext = createContext();

const getFromLocalstorage = ()=>{
   

        const value = localStorage.getItem("theme");
        return value || "Light";
    
};
export const ThemeContextProvider = ({childern})=>{
   const [ theme , setTheme] = useState(()=>{
    return getFromLocalstorage();
   });
    return    <ThemeContextProvider value={theme}>{childern}</ThemeContextProvider>
    
}
 
