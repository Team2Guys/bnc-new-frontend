import React from 'react'

import { fetchRedirectUrls} from 'config/fetch';
import dynamic from 'next/dynamic';
const MainPage = dynamic(()=>import('./MainPage'),{ssr:false})

async function  Page() {
  const  Redirecturls=await fetchRedirectUrls()
  return (
 
    
    <MainPage Redirecturls={Redirecturls} />
    

  )
}

export default Page