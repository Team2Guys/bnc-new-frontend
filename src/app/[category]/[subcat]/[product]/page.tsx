import {getSignleProd, } from 'config/fetch';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { BlindSchemaMap } from 'data/blinds-schema';
import { notFound } from 'next/navigation';
import Mainpage from 'components/CategoryPage/Mainpage';

 type meta_props = {
  params: Promise<{ 
    category: string;
    subcat: string
    product: string
  
  }>;
};

export async function generateMetadata({params}: meta_props): Promise<Metadata> {
  const product = (await params).product;
  const category = (await params).category;
  const response =  await  getSignleProd(product, category)
  const  filteredProduct = response.product || []
  if (!response) {
    return notFound();
  }

  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  let ImageUrl = filteredProduct?.posterImage?.imageUrl || 'blindsandcurtains';
  let alt = filteredProduct?.posterImage?.altText || 'blindsandcurtains';

  let NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];
  let title =
    filteredProduct?.Meta_Title ||
    'blindsandcurtains';
  let description = filteredProduct?.Meta_description ||
    'Welcome to blindsandcurtains';
  let url = `${fullUrl}${category}/${product}/`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
           type:"website"
    },
    alternates: {
      canonical:
         url,
    },
  };
}

const Page = async ({ params }: meta_props) => {
  const product = (await params).product;
  const category = (await params).category;
  const response =  await  getSignleProd(product, category)
  const  filteredProduct = response.product || []

  if (!response) {
    return notFound();
  }
  if (filteredProduct && filteredProduct.status !== "PUBLISHED") {
    return notFound();
  }

  const productTitle = filteredProduct?.title;
  const matchedSchema = BlindSchemaMap[productTitle];

  return (
    <>
      <Mainpage
        filteredProduct={filteredProduct}
        filteredSubCategory={filteredProduct.type == "subcategory"  && filteredProduct}
        product={product}
        matchedSchema={matchedSchema}
      />
    </>
  );
};

export default Page;
