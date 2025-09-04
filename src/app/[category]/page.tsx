import { fetchSingleCategory, fetchSingleCategorymain, } from "config/fetch";
import { IProduct } from "types/types";
import { headers } from "next/headers";
import { Metadata } from "next";
import { links } from "data/header_links";
import Script from "next/script";
import { notFound } from "next/navigation";
// import { getSubcategoriesByCategory } from "utils/helperFunctions";
import Product from "components/Product";
type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productName = (await params).category + "/";


  let Category = await fetchSingleCategory(productName)
  console.log(Category, "Category")

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
      type: "website",
    },
    alternates: {
      canonical:
        Category?.Canonical_Tag || url,
    },
  };
}

const Products = async ({ params }: Props) => {
  const slug = (await params).category;

  const category = await fetchSingleCategorymain(slug)
  if (!category) {
    return notFound();
  }
  const matchingLink: any = links.find((link) => slug.includes(link.href.replace(/^\//, '')),);

  // const subcategoryList = getSubcategoriesByCategory(category.title);
  // const lowerSubcategorySet = new Set(subcategoryList.map((sub) => sub.toLowerCase().trim()));

  const filteredProducts = category.products?.filter((product: IProduct) =>
    product.status === "PUBLISHED" 
  
  // && lowerSubcategorySet.has(product.title.toLowerCase()?.trim())
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
