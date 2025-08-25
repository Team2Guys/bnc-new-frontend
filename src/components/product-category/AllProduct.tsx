'use client'
import { useRef, useState } from 'react'
import Container from 'components/Res-usable/Container/Container'
import Card from 'components/ui/newCard'
import { desiredOrder } from 'data/new-data'
import { CategoryProps } from 'types/product'
import { IProduct } from 'types/types'

const PRODUCTS_PER_PAGE = 8

const AllProduct = ({ Products, title }: CategoryProps) => {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const sortedProducts = [...Products ?? []].sort(
    (a, b) => desiredOrder.indexOf(a.title) - desiredOrder.indexOf(b.title)
  )

  const handleToggle = () => {
    const isResetting = visibleCount >= sortedProducts.length
    if (isResetting) {
      setVisibleCount(PRODUCTS_PER_PAGE)
      const yOffset = -150;
      const y = sectionRef.current ? sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset : 0;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      setVisibleCount(prev => prev + PRODUCTS_PER_PAGE)
    }
  }

  const visibleProducts = sortedProducts.slice(0, visibleCount)

  return (
    <Container className='mt-10 space-y-5 md:space-y-10' ref={sectionRef}>
      <h2 className='categoryHeading text-center sm:text-start'>
        {title}
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 xs:gap-4 xs:px-6 sm:px-4 md:px-0'>
        {visibleProducts.map((product: IProduct, index: number) => (
          <Card card={product} key={index} />
        ))}
      </div>

      {sortedProducts.length > PRODUCTS_PER_PAGE && (
        <div className='text-center mt-4'>
          <button
            onClick={handleToggle}
            className='text-primary bg-secondary border border-secondary text-sm md:text-xl font-roboto font-semibold rounded-md py-2 lg:py-3 px-4 xxs:px-6 block w-fit mx-auto hover:bg-transparent hover:text-secondary'
          >
            {visibleCount >= sortedProducts.length ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </Container>
  )
}

export default AllProduct
