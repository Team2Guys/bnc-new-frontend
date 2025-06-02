import Container from 'components/Res-usable/Container/Container'
import Card from 'components/ui/newCard'
import { desiredOrder } from 'data/new-data'
import React from 'react'
import { CategoryProps } from 'types/product'
import { IProduct } from 'types/types'

const AllProduct = ({ Products, title }: CategoryProps) => {

  const sortedProducts = [...Products ?? []].sort(
  
    (a, b) => desiredOrder.indexOf(a.title) - desiredOrder.indexOf(b.title)
  )

  console.log('filter products' , sortedProducts)
  return (
    <Container className='mt-10 space-y-5 md:space-y-10'>
      <h2 className='categoryHeading text-center sm:text-start'>
        {title}
      </h2>

      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-6 sm:px-4 md:px-0'>
        {sortedProducts?.map((product: IProduct, index: number) => (
          <Card card={product} key={index} />
        ))}

      </div>
    </Container>
  )
}

export default AllProduct
