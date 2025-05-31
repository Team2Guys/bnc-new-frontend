import React from 'react'
import { fetchReviews } from 'config/fetch'
import dynamic from 'next/dynamic';
const MainPage = dynamic(()=>import('./MainPage'),{ssr:false})

async function  Page() {
  const  reviews=await fetchReviews()
  return (
    <MainPage reviews={reviews} />
  )
}

export default Page