import { IProduct } from 'types/types';
import Curtain from './Curtain';
import {
  fetchProducts,
  fetchSubCategories,
  filtereCategory,
  filterProd,
} from 'config/fetch';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { meta_props } from 'types/interfaces';
import { urls } from 'data/urls';
import NotFound from 'app/not-found';
import { CurtainsSchemaMap } from 'data/curtains-schema';

const Cateories = [5];

export async function generateMetadata({
  params,
}: meta_props): Promise<Metadata> {
  const product = (await params).product;

  const [products, categories] = await Promise.all([fetchProducts(),    fetchSubCategories()]);

  const filteredProduct = filterProd(products, product, Cateories);
  const filteredSubCategory = filtereCategory(categories, product, Cateories);

  const headersList = await headers();
  const domain =
    headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  let Product = filteredProduct as IProduct;

  let ImageUrl =Product?.posterImage?.imageUrl ||filteredSubCategory?.posterImage?.imageUrl ||'blindsandcurtains';
  let alt =
    Product?.posterImage.altText ||
    filteredSubCategory?.posterImage?.altText ||
    'blindsandcurtains';

  let NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];
  let title =
    Product?.Meta_Title ||
    filteredSubCategory?.Meta_Title ||
    'blindsandcurtains';
  let description =
    Product?.Meta_description ||
    filteredSubCategory?.Meta_description ||
    'Welcome to blindsandcurtains';
  let url = `${fullUrl}curtains/${product}/`;

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
        Product?.Canonical_Tag || filteredSubCategory?.Canonical_Tag || url,
    },
  };
}

const CommercialPage = async ({ params }: meta_props) => {
  const product = (await params).product;
  const [products] = await Promise.all([fetchProducts()]);
  const filteredProduct = filterProd(products, product, Cateories);
  const matchingUrl = urls.find((url) => `${url.errorUrl}/` === `/curtains/${product}/`);
  if (matchingUrl) {
    return <NotFound />
  }
  if ( !filteredProduct) {
    return <NotFound />;
  }
    const productTitle = filteredProduct?.title  || '';
    const matchedSchema = CurtainsSchemaMap[productTitle];
  return (
    <Curtain
      filteredProduct={filteredProduct}
      matchedSchema={matchedSchema}
    />
  );
};

export default CommercialPage;
