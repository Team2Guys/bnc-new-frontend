import Container from 'components/Res-usable/Container/Container'

const ProductPageSkeleton = () => {
   return (
      <Container className='animate-pulse mb-10'>
         <div className="bg-gray-300 h-10 w-60 rounded-lg mb-10 hidden md:block" />
         <div className="grid grid-cols-12 mt-10 gap-4 xl:gap-8 max-sm:px-0">
            <div className='col-span-12 md:col-span-6 xl:col-span-5 px-2'>
               <div className="bg-gray-300 h-[340px] xsm:h-[400px] lg:h-[450px] xl:h-[563px] mb-2" />
               <div className="flex gap-2">
                  <div className="bg-gray-300 aspect-square w-20 sm:w-28 lg:w-32 xl:w-40 mb-4 h-full" />
                  <div className="bg-gray-300 aspect-square w-20 sm:w-28 lg:w-32 xl:w-40 mb-4 h-full" />
                  <div className="bg-gray-300 aspect-square w-20 sm:w-28 lg:w-32 xl:w-40 mb-4 h-full" />
                  <div className="bg-gray-300 aspect-square w-20 sm:w-28 lg:w-32 xl:w-40 mb-4 h-full" />
               </div>
            </div>
            <div className='col-span-12 md:col-span-6 xl:col-span-7 space-y-2 sm:space-y-4 max-w-[650px]'>
               <div className="bg-gray-300 h-7 xl:h-12 w-full" />
               <div className="flex gap-2 lg:gap-4">
                  <div className="bg-gray-300 w-full h-10 rounded-full" />
                  <div className="bg-gray-300 w-full h-10 rounded-full" />
                  <div className="bg-gray-300 w-full h-10 rounded-full" />
                  <div className="bg-gray-300 w-full h-10 rounded-full" />
               </div>
               <div className="flex flex-col gap-2">
                  <div className="bg-gray-300 w-full h-4 rounded-full" />
                  <div className="bg-gray-300 w-full h-4 rounded-full" />
                  <div className="bg-gray-300 w-full h-4 rounded-full" />
                  <div className="bg-gray-300 w-full h-4 rounded-full" />
                  <div className="bg-gray-300 w-full h-4 rounded-full" />
                  <div className="bg-gray-300 w-full h-4 rounded-full" />
                  <div className="bg-gray-300 w-full h-4 rounded-full" />
                  <div className="bg-gray-300 w-full h-4 rounded-full" />
                  <div className="bg-gray-300 w-full h-4 rounded-full" />
                  <div className="bg-gray-300 w-44 h-6 my-2" />
                  <div className="flex gap-2">
                     <div className="bg-gray-300 h-10 sm:h-12 w-10 sm:w-12 rounded-sm" />
                     <div className="bg-gray-300 h-10 sm:h-12 w-10 sm:w-12 rounded-sm" />
                     <div className="bg-gray-300 h-10 sm:h-12 w-10 sm:w-12 rounded-sm" />
                     <div className="bg-gray-300 h-10 sm:h-12 w-10 sm:w-12 rounded-sm" />
                     <div className="bg-gray-300 h-10 sm:h-12 w-10 sm:w-12 rounded-sm" />
                     <div className="bg-gray-300 h-10 sm:h-12 flex-1 rounded-sm" />
                  </div>
                  <div className="bg-gray-300 w-40 h-12 rounded-md my-8 hidden md:block" />
                  <div className="hidden md:flex gap-2">
                     <div className="bg-gray-300 aspect-square h-full w-full rounded-sm" />
                     <div className="bg-gray-300 aspect-square h-full w-full rounded-sm" />
                     <div className="bg-gray-300 aspect-square h-full w-full rounded-sm" />
                     <div className="bg-gray-300 aspect-square h-full w-full rounded-sm" />
                  </div>
               </div>
            </div>

         </div>
      </Container>
   )
}

export default ProductPageSkeleton