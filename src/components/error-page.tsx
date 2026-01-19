import Link from 'next/link'
import React from 'react'

const ErrorPage = ({error}:{error:Error}) => {
  return (
        <div className="flex items-center justify-center h-[90vh]">
      <div className="flex justify-center items-center flex-col gap-4">
        <span className="flex justify-center items-center rounded-full w-30 h-30 text-white text-8xl bg-[#E41B22]">!</span>
        <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
        <p>{error.message}</p>
        <Link href="/contact-us"
          className="w-35 sm:w-40 h-10 sm:h-12 text-sm sm:text-base flex justify-center items-center rounded-full bg-primary text-white hover:bg-white border border-primary hover:text-primary transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage