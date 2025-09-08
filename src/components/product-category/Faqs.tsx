import Container from 'components/Res-usable/Container/Container'
import Accordion from 'components/ui/Accordion'
import { CategoryProps } from 'types/product'

const Faqs = ({ Data }: Omit<CategoryProps, "Products">) => {
  return (
    <>
    {Data?.faqs && Data.faqs.length > 0 &&
        <Container className='space-y-2 md:space-y-5 mt-5 md:mt-10 py-5 md:py-10 '>
          <div className='max-w-[780px] mx-auto'>
            <h2 className='categoryHeading  text-center'>{Data?.faqHeading ?? "Frequently Asked Questions"}</h2>
            <Accordion items={Data?.faqs} />
          </div>
        </Container>
    }
    </>
  )
}

export default Faqs