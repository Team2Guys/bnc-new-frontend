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

type TabKey = keyof typeof PRODUCT_TABS;

export default function NotFound() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('blinds');
  const [loading, setLoading] = useState(true);

  /* Fetch products */
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchProducts();
        setProducts(res.filter((p: IProduct) => p.status === 'PUBLISHED'));
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /* Filter products by tab */
  const filteredProducts = useMemo(() => {
    const allowedSlugs = PRODUCT_TABS[activeTab];

    return products
      .filter((product) => allowedSlugs.includes(String(product.customUrl)))
      .slice(0, 10);
  }, [activeTab, products]);

  return (
    <Container className="my-20 space-y-16">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-black">
          There&apos;s <span className="uppercase">Nothing</span> here ...
        </h2>
        <p className="text-sm sm:text-lg text-gray-600">
          ...maybe the page you are looking for does not exist.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-primary text-white border border-primary hover:bg-white hover:text-primary transition"
          >
            Back to Home
          </Link>

          <Link
            href="/contact-us"
            className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactInfo />
        <ContactForm />
      </div>

      <div className="space-y-10">
        <div className="flex flex-wrap justify-center gap-3">
          {(Object.keys(PRODUCT_TABS) as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-md font-medium transition
                ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-black hover:bg-primary hover:text-white'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} card={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link
            href={
              activeTab === 'blinds'
                ? '/made-to-measure-blinds/'
                : activeTab === 'curtains'
                  ? '/made-to-measure-curtains/'
                  : activeTab === 'shutters'
                    ? '/shutters-range/'
                    : `/${activeTab}/`
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
