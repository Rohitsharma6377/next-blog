import React, { useContext } from 'react'
import theme from './theme.module.css'
import { ThemeContext } from '../context/ThemeContext'
const Themetoggal = () => {

   const {theme} = useContext(ThemeContext)

  return (
    <div className={theme.container}>
        <img src="/moon.png" alt=""  width={14} height={14}/>
        <div className={theme.ball}></div>
        <img src="/sun.png" alt="" width={14} height={14}/>
    </div>
  )
}

export default Themetoggal;