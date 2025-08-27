import {
  fetchProducts,
  filterProd,
} from 'config/fetch';
import Shutters from './Shutters';
import { IProduct } from 'types/types';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { meta_props } from 'types/interfaces';
import { urls } from 'data/urls';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: meta_props): Promise<Metadata> {
  const product = (await params).product;
  const Cateories = [9];

  const products = await fetchProducts();

  const filteredProduct = filterProd(products, product, Cateories);

  const headersList = await headers();
  const domain =
    headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  let Product = filteredProduct as IProduct;

  let ImageUrl =
    Product?.posterImage?.imageUrl ||
    'blindsandcurtains';
  let alt =
    Product?.posterImage.altText ||
    'blindsandcurtains';

  let NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];
  let title =
    Product?.Meta_Title ||
    'blindsandcurtains';
  let description =
    Product?.Meta_description ||
    'Welcome to blindsandcurtains';
  let url = `${fullUrl}shutters-range/${product}/`;

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
        Product?.Canonical_Tag || url,
    },
  };
}

const CommercialPage = async ({ params }: meta_props) => {
  const product = (await params).product;
 
  const Cateories = [9];

  const products = await fetchProducts();

  const filteredProduct = filterProd(products, product, Cateories);

  const matchingUrl = urls.find((url) => `${url.errorUrl}/` === `/shutters-range/${product}/`);
  if (matchingUrl || !filteredProduct) {
    return notFound()
  }
  if (filteredProduct && filteredProduct.status !== "PUBLISHED") {
    return notFound()
  }

  return (
      <Shutters filteredProduct={filteredProduct}/>
  );
};

export default CommercialPage;
