import React from 'react'
import { fetchReviews } from 'config/fetch'
import MainPage from './MainPage';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function  Page() {
  const  reviews=await fetchReviews()
  return (
    <>
    <MainPage reviews={reviews} />
    </>
  )
}

export default Page