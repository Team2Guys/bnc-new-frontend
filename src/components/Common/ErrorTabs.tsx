'use client';
import Card from 'components/ui/newCard';
import { generateSlug } from 'data/data';
import { PRODUCT_TABS } from 'data/error';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { IProduct } from 'types/types';
type TabKey = keyof typeof PRODUCT_TABS;
const ErrorTabs = ({ products }: { products: IProduct[] }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('blinds');
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
    <div className="space-y-10 w-full">
      <div className="flex overflow-x-auto justify-start sm:justify-center gap-3">
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
      {filteredProducts.length === 0 ? (
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
          className="text-primary bg-secondary font-semibold rounded-md p-2 sm:py-3 px-6 hover:opacity-70 transition"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default ErrorTabs;
