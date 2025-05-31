import Container from 'components/Res-usable/Container/Container'
import Accordion from 'components/ui/Accordion'
import React from 'react'
import { CategoryProps } from 'types/product'

const Faqs = ({ Data }: CategoryProps) => {
  return (
    <>
    {Data?.faqs && Data.faqs.length > 0 &&
        <Container className='space-y-2 md:space-y-5 mt-5 md:mt-10 py-5 md:py-10 '>
          <div className='max-w-[780px] mx-auto'>
            <h1 className='categoryHeading  text-center'>{Data?.faqHeading ?? "Frequently Asked Questions"}</h1>
            <Accordion items={Data?.faqs} />
          </div>
        </Container>
    }
    </>
  )
}

export default Faqs