"use client";
import React, { useState } from "react";
import Container from "components/Res-usable/Container/Container";
import { ICategory, IProduct } from "types/types";
import Support from "components/Res-usable/support/support";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";

const itemsPerPage = 12;

const Gallery = ({
  products,
  categories,
}: {
  products: IProduct[];
  categories: ICategory[];
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const All_Content =
    "Take a Look at the Beautiful Window Coverings We’ve Installed Across Dubai";
  const [conent, setconent] = useState(All_Content);

  const filteredProducts = selectedCategoryId
    ? products?.filter((product) => product.CategoryId === selectedCategoryId)
    : products;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    (filteredProducts?.length || 0) / itemsPerPage
  );

  const Category_wise_Conent: { [key: string]: string } = {
    2: "Take a look at the stylish and functional blinds we've installed in Dubai homes and offices",
    5: "From blackout to sheer curtains, you'll find every style here",
    9: "You can view our shutter installations by scrolling down through the pictures in the gallery below",
    12: "You can make your windows look sophisticated with custom window treatments in a variety of fabrics and colours",
  };

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1);
    let content = categoryId && Category_wise_Conent[categoryId];
    setconent(content ? content : All_Content);
  };

  return (
    <>
      <Container className="pt-16 pb-12 px-4 md:px-0">
        <div className="flex flex-col justify-between items-center pb-4 mb-6 overflow-hidden md:px-5">
          <h1 className="text-2xl xs:text-3xl font-medium text-gray-800 m-auto">
            GALLERY
          </h1>
          <p className="text-center max-w-[70%] mt-4">
            Window Treatment Inspiration Gallery
          </p>
        </div>

        {/* Category Filter */}
        <div className="overflow-x-auto">
          <div className="flex justify-center min-w-fit mx-auto pb-5">
            <div
              className={`py-2 px-2 rounded cursor-pointer !text-[12px] md:!text-[16px] ${
                selectedCategoryId === null ? "bg-secondary text-white" : ""
              }`}
              onClick={() => handleCategoryClick(null)}
            >
              All
            </div>
            {categories &&
              categories
                .sort((a, b) => {
                  const order = ["Blinds", "Curtains", "Shutters", "Commercial"];
                  return order.indexOf(a.title) - order.indexOf(b.title);
                })
                .map((category: ICategory, index: number) => (
                  <div
                    className={`py-2 px-[.35rem] md:px-4 rounded !text-[12px] md:!text-[16px] cursor-pointer ${
                      selectedCategoryId === category.id
                        ? "bg-secondary text-white"
                        : ""
                    }`}
                    key={index}
                    onClick={() => handleCategoryClick(category.id!)}
                  >
                    {category.title}
                  </div>
                ))}
          </div>
        </div>
      </Container>

      <div className="w-full border-t-[1px] border-borderclr "></div>

      <Container className="lg:pt-12 pt-5 pb-16 px-4 md:px-0">
        <p className="text-center text-14 font-semibold md:font-normal lg:text-2xl xl:text-3xl 2xl:text-4xl leading-normal text-black w-full md:w-4/5 xl:w-3/4 mx-auto">
          {conent}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xs:mt-20 mt-5 md:px-4">
          {currentItems &&
            currentItems.map((product: any, index: number) => {
              if (!product.category) return null;
              return (
                <div
                  className="relative rounded-lg group w-full cursor-pointer"
                  key={index}
                  onClick={() => setPreviewImage(product.posterImage.imageUrl)}
                >
                  <Image
                    src={product.posterImage.imageUrl}
                    alt={product.posterImage.altText || "Image"}
                    width={300}
                    height={200}
                    className="rounded-xl w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-xl">
                    <IoSearch className="text-white text-3xl" />
                  </div>
                  <div className="absolute bottom-0 rounded-b-xl px-2 w-full h-12 flex items-center justify-center bg-secondary md:opacity-1 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-black text-start">{product.title}</span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-center items-center mt-20 w-full">
          {filteredProducts && filteredProducts.length > 0 && (
            <>
              {Array.from({ length: totalPages }, (_, page) => (
                <button
                  key={page + 1}
                  className={`mx-1 w-10 h-10 flex justify-center items-center rounded-sm font-medium transition ${
                    currentPage === page + 1
                      ? "bg-secondary text-white"
                      : "bg-transparent text-black hover:bg-secondary hover:text-white"
                  }`}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
            </>
          )}
        </div>
      </Container>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <Image
            src={previewImage}
            width={800}
            height={600}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setPreviewImage(null)}
          >
            ✕
          </button>
        </div>
      )}

      <Support />
    </>
  );
};

export default Gallery;
