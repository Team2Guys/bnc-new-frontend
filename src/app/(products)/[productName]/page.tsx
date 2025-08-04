import { fetchSingleCategory, fetchSingleCategorymain, } from "config/fetch";
import Product from "../../../components/Product";
import { IProduct } from "types/types";
import { headers } from "next/headers";
import { Metadata } from "next";
import { links } from "data/header_links";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getSubcategoriesByCategory } from "utils/helperFunctions";
type Props = {
  params: Promise<{ productName: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productName = (await params).productName + "/";


  let Category = await fetchSingleCategory(productName)

  if (!Category) {
    notFound();
  }
  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  let ImageUrl = Category?.posterImage?.imageUrl || 'blindsandcurtains';
  let alt = Category?.posterImage?.altText || 'blindsandcurtains';

  let NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];
  let title =
    Category?.Meta_Title ||
    'blindsandcurtains';
  let description =
    Category?.Meta_description ||
    'Welcome to blindsandcurtains';
  let url = `${fullUrl}${productName}`;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
      type:"website",
    },
    alternates: {
      canonical:
        Category?.Canonical_Tag || url,
    },
  };
}

const Products = async ({ params }: Props) => {
  const slug = (await params).productName;

  const category = await fetchSingleCategorymain(slug)
  if (!category) {
    return notFound();
  }
  const matchingLink: any = links.find((link) => slug.includes(link.href.replace(/^\//, '')),);

  const subcategoryList = getSubcategoriesByCategory(category.title);
  const lowerSubcategorySet = new Set(subcategoryList.map((sub) => sub.toLowerCase().trim()));

  const filteredProducts = category.products?.filter((product: IProduct) =>
    lowerSubcategorySet.has(product.title.toLowerCase()?.trim())
  );



  return (
    <>
      <Script type="application/ld+json" id="categories-json-ld">
        {JSON.stringify(matchingLink?.script || "")}
      </Script>
      <Product
        categories={category}
        filteredItems={filteredProducts}
      />
    </>
  );
};

export default Products;
