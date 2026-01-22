'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import Container from 'components/Res-usable/Container/Container';
import ContactInfo from 'components/Contact/contact-info';
import ContactForm from 'components/Contact/contact-form';
import Card from 'components/ui/newCard';

import { fetchProducts } from 'config/fetch';
import { IProduct } from 'types/types';
import { PRODUCT_TABS } from 'data/error';
import { generateSlug } from 'data/data';

type TabKey = keyof typeof PRODUCT_TABS;

export default function NotFound() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('blinds');
  const [loading, setLoading] = useState(true);

  /* FETCH PRODUCTS */
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchProducts();
        setProducts(res.filter((p: IProduct) => p.status === 'PUBLISHED'));
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /* ORDERED PRODUCTS BY TAB */
  const filteredProducts = useMemo(() => {
    const orderedSlugs = PRODUCT_TABS[activeTab];

    return orderedSlugs
      .map((slug) =>
        products.find((product) => {
          const productSlug = product.customUrl
            ? generateSlug(product.customUrl as string)
            : generateSlug(product.title);

          return productSlug === generateSlug(slug);
        }),
      )
      .filter(Boolean)
      .slice(0, 10) as IProduct[];
  }, [activeTab, products]);

  return (
    <Container className="my-20 space-y-16">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold">
          Product Not Found
        </h2>
        <p className="text-2xl">
          Thank you for your patience. You are very special to us!
        </p>
        <p className="text-primary">
          Your desired product either has been sold or is in the publishing
          process.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 border rounded-md bg-secondary text-white hover:bg-white border-secondary hover:text-primary transition font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactInfo />
        <ContactForm />
      </div>

      {/* TABS */}
      <div className="space-y-10">
        <div className="flex flex-wrap justify-center gap-3">
          {(Object.keys(PRODUCT_TABS) as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-md font-medium transition ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-secondary hover:bg-primary hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} card={product} />
            ))}
          </div>
        )}

        {/* VIEW MORE */}
        <div className="flex justify-center">
          <Link
            href={
              activeTab === 'blinds'
                ? '/made-to-measure-blinds/'
                : activeTab === 'curtains'
                  ? '/made-to-measure-curtains/'
                  : activeTab === 'shutters'
                    ? '/shutters-range/'
                    : '/commercial/'
            }
            className="text-primary bg-secondary font-semibold rounded-md py-3 px-6 hover:opacity-70 transition"
          >
            View More
          </Link>
        </div>
      </div>
    </Container>
  );
}
