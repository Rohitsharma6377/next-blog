import React from 'react'
import nav from '../navbar/nav.module.css'
import Link from 'next/link';
import Themetoggal from '../themetoggal/Themetoggal';
import Authlink from '../authlinks/Authlink';
const Navbar = () => {
  return (
   <div className={nav.container}>
<div className={nav.social}>
    <img src="/facebook.png" alt="social" width={24} height={24}/>
    <img src="/instagram.png" alt="social" width={24} height={24}/>
    <img src="/tiktok.png" alt="social" width={24} height={24}/>
    <img src="/youtube.png" alt="social" width={24} height={24}/>
</div>
<div className={nav.logo}>Pixels&Co.</div>
<div className={nav.links}>
    <Themetoggal/>
    <Link href="/">Home </Link>
    <Link href="/contact">Contact</Link>
    <Link href="/about">About</Link>
    <Link href="/login">Login</Link>
   <Authlink/>
</div>
   </div>
  )
}

export default Navbar;