
import FaqTabs from "components/NewHomecomponents/faqstabs";
import Breadcrumb from "components/Res-usable/breadcrumb";
import Container from "components/Res-usable/Container/Container";
import { Faqspara } from "data/Homedata/tabdata";
import { metaData } from "data/meta-data";
import { generateMetadata } from "utils/seoMetadata";
export const metadata = generateMetadata(metaData.faqs);
const FAQPage = () => {
  return (
    <div>
      <Breadcrumb image="/assets/images/Home/faqsbanner.webp" 
      title="Frequently Asked Questions About Blinds and Curtains Dubai" bradcrumbtitle="Frequently Asked Questions"/>
      <Container>
      <div className="flex justify-center items-center">
      <h2 className="font-roboto font-normal text-sm md:text-xl text-center my-5 sm:my-7 text-primary md:max-w-screen-lg "
        dangerouslySetInnerHTML={{ __html: Faqspara }}
      />
      </div>
      <FaqTabs/>
      </Container>
    </div>
  );
};

export default FAQPage;
