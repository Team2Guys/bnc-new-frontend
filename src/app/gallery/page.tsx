import React from 'react';
import Gallery from './Gallery';
import { fetchProducts } from 'config/fetch';
import { metaData } from 'data/meta-data';
import { generateMetadata } from 'utils/seoMetadata';
import Breadcrumb from 'components/Res-usable/breadcrumb';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const metadata = generateMetadata(metaData.gallery);
const GalleryPage = async () => {
  const products = await fetchProducts();
  return (
    <>
      <Breadcrumb title="Gallery" bradcrumbtitle="Gallery" />
      <Gallery products={products} />
    </>
  );
};
export default GalleryPage;
