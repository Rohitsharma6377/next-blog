import Link from 'next/link';
import React from 'react'

const Authlink = () => {
  const status = "noauth"
  return (
   <>
   {status==="noath"?(
    <Link href="/login">Login</Link>

   ):(
   <>
   <Link href="/write">Write</Link>
   <span>Logout</span>
   </>
   )}
   </>
  )
}

export default Authlink;