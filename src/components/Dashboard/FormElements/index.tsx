'use client';

import React, { useState, useEffect, SetStateAction, useRef } from 'react';
import { Formik, FieldArray, FormikErrors, Form, FormikTouched } from 'formik';

import Imageupload from 'components/ImageUpload/Imageupload';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { handleImageAltText, ImageRemoveHandler } from 'utils/helperFunctions';
import { FormValues, ADDPRODUCTFORMPROPS } from 'types/interfaces';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import Cookies from 'js-cookie';

import {
  AddProductvalidationSchema,
  AddproductsinitialValues,
} from 'data/data';
import { useQuery } from '@tanstack/react-query';
import { ICategory } from 'types/types';
import { fetchCategories, fetchSubCategories } from 'config/fetch';
import showToast from 'components/Toaster/Toaster';
import revalidateTag from 'components/ServerActons/ServerAction';
import Checkbox from 'components/ui/Checkbox';
import TopButton from '../Layouts/TopButton';

const FormElements: React.FC<ADDPRODUCTFORMPROPS> = ({
  EditInitialValues,
  setselecteMenu,
  setEditProduct,
}) => {
  const [imagesUrl, setImagesUrl] = useState<any[]>([]);
  const [videos, setvideos] = useState<any[]>(
    (EditInitialValues &&
      EditInitialValues.videos &&
      EditInitialValues.videos) ||
      [],
  );
  const [posterimageUrl, setposterimageUrl] = useState<any[] | undefined>(
    EditInitialValues &&
      EditInitialValues.posterImage && [EditInitialValues.posterImage],
  );
  const [bannerImageUrl, setBannerImageUrl] = useState<any[] | undefined>(
    EditInitialValues &&
      EditInitialValues.bannerImage && [EditInitialValues.bannerImage],
  );
  const [privarcyImagemageUrl, setprivarcyImage] = useState<any[] | undefined>(
    EditInitialValues &&
      EditInitialValues.privarcyImage && [EditInitialValues.privarcyImage],
  );

  const [subCategoryImage, setsubCategoryImage] = useState<any[] | undefined>(
    EditInitialValues &&
      EditInitialValues.subCategoryImage && [
        EditInitialValues.subCategoryImage,
      ],
  );
  const [topImages, settopImages] = useState<any[]>(
    EditInitialValues &&
      EditInitialValues.topImages &&
      EditInitialValues.topImages,
  );
  const [colorsImages, setcolorsImages] = useState<any[]>(
    EditInitialValues &&
      EditInitialValues.colorsImages &&
      EditInitialValues.colorsImages,
  );
  const [productUpdateFlat, setProductUpdateFlat] = useState(false);
  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<any | null | undefined >(EditInitialValues);

  const [imgError, setError] = useState<string | null | undefined>();

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<number[] >([]);

  const [previousSelectedCategories, setpreviousSelectedCategories] = useState<number[]>([]);
  const dragImage = useRef<number | null>(null);
  const draggedOverImage = useRef<number | null>(null);
  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  let finalToken = token ? token : superAdminToken;

  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        if (EditInitialValues.id === undefined) return;

        setProductUpdateFlat(true);
        const {
          posterImageUrl,
          imageUrls,
          _id,
          createdAt,
          updatedAt,
          __v,
          hoverImage,
          category,
          subCategory,
          ...EditInitialProductValues
        } = EditInitialValues as any;
        imageUrls ? setImagesUrl(imageUrls) : null;

        console.log(
          posterImageUrl,
          imageUrls,
          _id,
          createdAt,
          updatedAt,
          __v,
          hoverImage,
          category,
          subCategory,
          EditInitialProductValues,
        );
        console.log(EditInitialValues, 'formikValues');
        if (category) {
          const catArr = [];
          catArr.push(category);
          setSelectedCategoryIds(catArr);
        }
        if (subCategory && Array.isArray(subCategory)) {
          const subcatArr = subCategory.map((cat: { id: number }) => cat.id);
          setSelectedSubcategoryIds(subcatArr);
          setpreviousSelectedCategories(subcatArr);
        }

        setProductInitialValue({
          ...EditInitialProductValues,
          name: EditInitialProductValues.title,
        });
        setBannerImageUrl(
          EditInitialValues &&
            EditInitialValues.bannerImage && [EditInitialValues.bannerImage],
        );
        setprivarcyImage(
          EditInitialValues &&
            EditInitialValues.privarcyImage && [
              EditInitialValues.privarcyImage,
            ],
        );
        setposterimageUrl(
          EditInitialValues &&
            EditInitialValues.posterImage && [EditInitialValues.posterImage],
        );
        setsubCategoryImage(
          EditInitialValues &&
            EditInitialValues.subCategoryImage && [
              EditInitialValues.subCategoryImage,
            ],
        );
        setsubCategoryImage(
          EditInitialValues &&
            EditInitialValues.topImages && [EditInitialValues.topImages],
        );
        setsubCategoryImage(
          EditInitialValues &&
            EditInitialValues.colorsImages && [EditInitialValues.colorsImages],
        );
      } catch (err) {
        console.log(err, 'err');
      }
    };

    CategoryHandler();
  }, [EditInitialValues]);

  function handleSort() {
    if (dragImage.current === null || draggedOverImage.current === null) return;

    const imagesClone = imagesUrl && imagesUrl.length > 0 ? [...imagesUrl] : [];

    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;

    setImagesUrl(imagesClone);
  }

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      setError(null);
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      let bannerImage = bannerImageUrl && bannerImageUrl[0];
      let newsubCategoryImage = subCategoryImage && subCategoryImage[0];
      let privarcyImage = privarcyImagemageUrl && privarcyImagemageUrl[0];
      if (!posterImageUrl || !(imagesUrl) ||  !(imagesUrl?.length > 0)) {
        return showToast('warn', 'Please select relevant Images');
      }

      let newValues = {
        ...values,
        title: values.name,
        posterImage: posterImageUrl,
        bannerImage: bannerImage !== undefined ? bannerImage : null,
        privarcyImage: privarcyImage !== undefined ? privarcyImage : null,
        subCategoryImage:
          newsubCategoryImage !== undefined ? newsubCategoryImage : null,
        videos: videos,
        colorsImages: colorsImages,
        topImages: topImages,
        imageUrls: imagesUrl,
        price: values.salePrice,
        Meta_description: values.Meta_Description,
      };

      setloading(true);
      let updateFlag = productUpdateFlat;

      let url = updateFlag
        ? `/api/products/edit_product/${EditInitialValues.id} `
        : '/api/products/AddProduct';

      const {
        categories,
        subcategories,
        purchasePrice,
        reviews,
        sizes,
        starRating,
        variantStockQuantities,
        discountPrice,
        totalStockQuantity,
        spacification,
        stock,
        salePrice,
        Meta_Description,
        hoverImage: newhoverImage,
        id,
        name,
        ...finalValues
      } = newValues;

      console.log(
        categories,
        subcategories,
        purchasePrice,
        reviews,
        sizes,
        starRating,
        variantStockQuantities,
        discountPrice,
        totalStockQuantity,
        spacification,
        stock,
        salePrice,
        Meta_Description,
        newhoverImage,
        id,
        name,
        finalValues,

        'modelDetails',
      );

      let updatedvalue = {
        ...finalValues,
        category: { connect: { id: selectedCategoryIds[0] } },
      };

      if (selectedSubcategoryIds.length > 0) {
        updatedvalue = {
          ...updatedvalue,
          subCategory: updateFlag
            ? {
                set: selectedSubcategoryIds.map((id) => ({ id })),
              }
            : {
                connect: selectedSubcategoryIds.map((id) => ({ id })),
              },
        };
      } else if (updateFlag) {
        updatedvalue = {
          ...updatedvalue,
          subCategory: {
            disconnect: previousSelectedCategories.map((id) => ({ id })),
          },
        };
      }

      let method: 'post' | 'put' = updateFlag ? 'put' : 'post';
      await axios[method](
        `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
        updatedvalue,
        {
          headers: {
            authorization: `Bearer ${finalToken}`,
          },
        },
      );
      revalidateTag('products');

      showToast(
        'success',
        `Product has been successfully ${updateFlag ? 'updated!' : 'Addded'}`,
      );
      setProductInitialValue(AddproductsinitialValues);
      resetForm();
      setloading(false);
      setposterimageUrl(undefined);
      setBannerImageUrl(undefined);
      setprivarcyImage(undefined);
      setposterimageUrl(undefined);
      setImagesUrl([]);
      setvideos([]);
      setSelectedCategoryIds([]);
      setSelectedSubcategoryIds([]);

      updateFlag ? setEditProduct && setEditProduct(undefined) : null;
      setselecteMenu('Categories');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    } finally {
      setloading(false);
    }
  };

const handlecolorChange = (
    index: number,
    newaltText: string,
    setImageUrl: React.Dispatch<SetStateAction<any>>,
  ) => {
    const updatedImagesUrl = colorsImages.map((item, i) =>
      i === index ? { ...item, altText: newaltText } : item,
    );
    setImageUrl(updatedImagesUrl);
  };


  const { data: categoriesList = [], isLoading } = useQuery<ICategory[], Error>(
    {
      queryKey: ['categories'],
      queryFn: fetchCategories,
    },
  );

  const { data: subCategoriesList = [] } = useQuery<ICategory[], Error>({
    queryKey: ['subcategories'],
    queryFn: fetchSubCategories,
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const filteredSubcategories = subCategoriesList.filter((subcategory) =>
      selectedCategoryIds.includes(subcategory.CategoryId),
    );
    setFilteredSubcategories(filteredSubcategories);
  }, [selectedCategoryIds, categoriesList]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          productInitialValue ? productInitialValue : AddproductsinitialValues
        }
        validationSchema={AddProductvalidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
          <TopButton  setMenuType={setselecteMenu} loading={loading}/>

              <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mt-1">
                <div className="flex flex-col gap-9 dark:border-strokedark dark:bg-lightdark">
                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark p-6">
                    <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                      <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Poster Image
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                          {posterimageUrl.map((item: any, index) => {
                            return (
                              <>
                                <div
                                  className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                  key={index}
                                >
                                  <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full">
                                    <RxCross2
                                      className="cursor-pointer errorColor hover:errorColor-700"
                                      size={17}
                                      onClick={() => {
                                        ImageRemoveHandler(
                                          item.public_id,
                                          setposterimageUrl,
                                        );
                                      }}
                                    />
                                  </div>
                                  <Image
                                    key={index}
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={400}
                                    src={item?.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>

                                <input
                                  className="primary-input"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item.altText}
                                  onChange={(e) =>
                                    handleImageAltText(index,e.target.value,setposterimageUrl,"altText",  )
                                   
                                  }
                                />

                                
                                <input
                                  className="primary-input"
                                  placeholder="pricing"
                                  type="text"
                                  name="pricing"
                                  value={item.pricing}
                                  onChange={(e) =>
                                    handleImageAltText(index,e.target.value,setposterimageUrl,"pricing",  )
                                   
                                  }
                                />

                                <input
                                  className="primary-input"
                                  placeholder="dimentions"
                                  type="text"
                                  name="dimentions"
                                  value={item.dimentions}
                                  onChange={(e) =>
                                    handleImageAltText(index,e.target.value,setposterimageUrl,"dimentions",  )
                                   
                                  }
                                />



                              </>
                            );
                          })}
                        </div>
                      ) : (
                        <Imageupload setposterimageUrl={setposterimageUrl} />
                      )}
                    </div>

                    <div className="flex flex-col gap-5 py-4">
                      <div>
                        <label className="primary-label ">Product Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          placeholder="Product name"
                          className={`primary-input ${
                            formik.touched.name && formik.errors.name
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="errorColor text-sm">
                            {formik.errors.name as String}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex  gap-2 flex-nowrap mad:flex-wrap">
                        <div className="w-1/2">
                          <label className="primary-label">Description </label>
                          <textarea
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            placeholder="description"
                            className={`primary-input ${
                              formik.touched.description &&
                              formik.errors.description
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                          {formik.touched.description &&
                          formik.errors.description ? (
                            <div className="errorColor text-sm">
                              {
                                formik.errors.description as FormikErrors<
                                  FormValues['description']
                                >
                              }
                            </div>
                          ) : null}
                        </div>

                        <div className="w-1/2">
                          <label className="primary-label">
                            Short Description{' '}
                          </label>
                          <textarea
                            name="short_description"
                            onChange={formik.handleChange}
                            value={formik.values.short_description}
                            placeholder="Short Description"
                            className={`primary-input ${
                              formik.touched.short_description &&
                              formik.errors.short_description
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                          {formik.touched.short_description &&
                          formik.errors.short_description ? (
                            <div className="errorColor text-sm">
                              {
                                formik.errors.short_description as FormikErrors<
                                  FormValues['short_description']
                                >
                              }
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <label className="primary-label">Heading </label>
                        <textarea
                          name="heading"
                          onChange={formik.handleChange}
                          value={formik.values.heading}
                          placeholder="Heading Text"
                          className={`primary-input ${
                            formik.touched.heading && formik.errors.heading
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                        {formik.touched.heading && formik.errors.heading ? (
                          <div className="errorColor text-sm">
                            {
                              formik.errors.heading as FormikErrors<
                                FormValues['heading']
                              >
                            }
                          </div>
                        ) : null}
                      </div>

                      <div className="flex full gap-4">
                        <div className="w-[50%]">
                          <label className="primary-label">customUrl</label>
                          <input
                            type="text"
                            name="customUrl"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.customUrl}
                            placeholder="customUrl"
                            className={`primary-input ${
                              formik.touched.customUrl &&
                              formik.errors.customUrl
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                        </div>

                        <div className="w-[50%]">
                          <label className="primary-label">breadcurum</label>
                          <input
                            type="breadcurum"
                            name="breadcurum"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.breadcurum}
                            placeholder="Discount Price"
                            className={`primary-input ${
                              formik.touched.breadcurum &&
                              formik.errors.breadcurum
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex full gap-4">
                        <div className="w-[50%]">
                          <label className="primary-label">topHeading</label>
                          <input
                            type="text"
                            name="topHeading"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.topHeading}
                            placeholder="topHeading"
                            className={`primary-input ${
                              formik.touched.topHeading &&
                              formik.errors.topHeading
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                        </div>

                        <div className="w-[50%]">
                          <label className="primary-label">mainHeading</label>
                          <input
                            type="mainHeading"
                            name="mainHeading"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mainHeading}
                            placeholder="Discount Price"
                            className={`primary-input ${
                              formik.touched.mainHeading &&
                              formik.errors.mainHeading
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex full gap-4">
                        <div className="w-[50%]">
                          <label className="primary-label">Sale Price</label>
                          <input
                            type="number"
                            name="salePrice"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.salePrice}
                            placeholder="Sale Price"
                            className={`primary-input ${
                              formik.touched.salePrice &&
                              formik.errors.salePrice
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                          {formik.touched.salePrice &&
                          formik.errors.salePrice ? (
                            <div className="errorColor text-sm">
                              {
                                formik.errors.salePrice as FormikErrors<
                                  FormValues['salePrice']
                                >
                              }
                            </div>
                          ) : null}
                        </div>

                        <div className="w-[50%]">
                          <label className="primary-label">
                            Discount Price
                          </label>
                          <input
                            type="number"
                            name="discountPrice"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.discountPrice}
                            placeholder="Discount Price"
                            className={`primary-input ${
                              formik.touched.discountPrice &&
                              formik.errors.discountPrice
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                          {formik.touched.discountPrice &&
                          formik.errors.discountPrice ? (
                            <div className="errorColor text-sm">
                              {formik.errors.discountPrice as String}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="w-full">
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Select Parent Category (at least one)
                        </label>
                        {isLoading ? (
                          <div>
                            <Loader color="#fff" />
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {categoriesList.map((category) => (
                              <Checkbox
                                key={category.id}
                                id={`category-${category.id}`}
                                name="CategoryId"
                                checked={selectedCategoryIds.includes(category.id)}
                                label={category.title}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setSelectedCategoryIds(() => {
                                    if (checked) {
                                      return [category.id]; // single selection
                                    } else {
                                      setSelectedSubcategoryIds([]); // clear subs when deselecting parent
                                      return [];
                                    }
                                  });
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <h2 className="text-lg font-medium dark:text-white">
                          Subcategories
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          {filteredSubcategories.map((subcategory) => (
                            <Checkbox
                            key={subcategory.id}
                              id={`subcategory-${subcategory.id}`}
                              name="SubcategoryId"
                              checked={selectedSubcategoryIds.includes(subcategory.id)}
                              label={subcategory.title}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setSelectedSubcategoryIds((prev) => {
                                  if (checked) {
                                    return [...prev, subcategory.id];
                                  } else {
                                    return prev.filter((id) => id !== subcategory.id);
                                  }
                                });
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-2/4">
                          <label className="primary-label">Meta Title</label>
                          <input
                            type="text"
                            name="Meta_Title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Meta_Title}
                            placeholder="Meta Title"
                            className={`primary-input ${
                              formik.touched.name && formik.errors.name
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                        </div>
                        <div className="w-2/4">
                          <label className="primary-label">Canonical Tag</label>
                          <input
                            onBlur={formik.handleBlur}
                            type="text"
                            name="Canonical_Tag"
                            onChange={formik.handleChange}
                            value={formik.values.Canonical_Tag}
                            placeholder="Canonical Tag"
                            className={`primary-input ${
                              formik.touched.name && formik.errors.name
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="primary-label">
                          Meta Description
                        </label>
                        <textarea
                          name="Meta_Description"
                          onChange={formik.handleChange}
                          value={formik.values.Meta_Description}
                          placeholder="Meta Description"
                          className={`primary-input ${
                            formik.touched.description &&
                            formik.errors.description
                              ? 'border-red-500'
                              : ''
                          }`}
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="w-full">
                          <label className="primary-label">
                            Images Alt Text
                          </label>
                          <input
                            type="text"
                            name="Images_Alt_Text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Images_Alt_Text}
                            placeholder="Images Alt Text"
                            className={`primary-input ${
                              formik.touched.name && formik.errors.name
                                ? 'border-red-500'
                                : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        FAQS
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                      <FieldArray name="faqs">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.faqs &&
                              formik.values.faqs.map(
                                (spec: any, index: any) => (
                                  <div
                                    key={index}
                                    className="flex gap-2 items-center"
                                  >
                                    <input
                                      type="text"
                                      name={`faqs[${index}].specsHeading`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.faqs[index].specsHeading
                                      }
                                      placeholder="FAQS Heading"
                                      className={`primary-input 
      
                                              
                                            `}
                                    />
                                    <input
                                      type="text"
                                      name={`faqs[${index}].specsDetails`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.faqs[index].specsDetails
                                      }
                                      placeholder="FAQS Details"
                                      className={`primary-input 
      
                                              
                                            `}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="ml-2 errorColor"
                                    >
                                      <RxCross2
                                        className="errorColor"
                                        size={25}
                                      />
                                    </button>
                                  </div>
                                ),
                              )}
                            <button
                              type="button"
                              onClick={() => push({ specsDetails: '' })}
                              className="dashboard_primary_button"
                            >
                              Add FAQS
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Privacy Section
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                      <FieldArray name="privacySectoin">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.privacySectoin &&
                              formik.values.privacySectoin.map(
                                (spec: any, index: any) => (
                                  <div
                                    key={index}
                                    className="flex gap-2 items-center"
                                  >
                                    <input
                                      type="text"
                                      name={`privacySectoin[${index}].specsHeading`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.privacySectoin[index]
                                          .specsHeading
                                      }
                                      placeholder="privacySectoin Heading"
                                      className={`primary-input 
      
                                              
                                            `}
                                    />
                                    <input
                                      type="text"
                                      name={`privacySectoin[${index}].specsDetails`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.privacySectoin[index]
                                          .specsDetails
                                      }
                                      placeholder="privacySectoin Details"
                                      className={`primary-input 
      
                                              
                                            `}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="ml-2 errorColor"
                                    >
                                      <RxCross2
                                        className="errorColor"
                                        size={25}
                                      />
                                    </button>
                                  </div>
                                ),
                              )}
                            <button
                              type="button"
                              onClick={() => push({ specsDetails: '' })}
                              className="dashboard_primary_button"
                            >
                              Add privacySectoin
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="flex  gap-4">
                    <div className="w-1/2">
                      <label className="primary-label">Sub Heading</label>
                      <textarea
                        name="Sub_Heading"
                        onChange={formik.handleChange}
                        value={formik.values.Sub_Heading}
                        placeholder="Sub Heading"
                        className={`primary-input ${
                          formik.touched.Sub_Heading &&
                          formik.errors.Sub_Heading
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.touched.Sub_Heading &&
                      formik.errors.Sub_Heading ? (
                        <div className="errorColor text-sm">
                          {
                            formik.errors.heading as FormikErrors<
                              FormValues['Sub_Heading']
                            >
                          }
                        </div>
                      ) : null}
                    </div>

                    <div className="w-1/2">
                      <label className="primary-label">
                        Sub Heading Description
                      </label>
                      <textarea
                        name="Sub_Heading_description"
                        onChange={formik.handleChange}
                        value={formik.values.Sub_Heading_description}
                        placeholder="Sub Heading Description"
                        className={`primary-input ${
                          formik.touched.Sub_Heading_description &&
                          formik.errors.Sub_Heading_description
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {formik.touched.Sub_Heading_description &&
                      formik.errors.Sub_Heading_description ? (
                        <div className="errorColor text-sm">
                          {
                            formik.errors.heading as FormikErrors<
                              FormValues['Sub_Heading_description']
                            >
                          }
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke p-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Descripton(On Subcategory Page)
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5 p-4">
                      <FieldArray name="modelDetails">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values?.modelDetails?.map(
                              (model: any, index: any) => (
                                <>
                                  <div
                                    key={index}
                                    className="flex flex-col gap-3"
                                  >
                                    <input
                                      type="text"
                                      name={`modelDetails[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.modelDetails[index].name
                                      }
                                      placeholder="Sub Category Name"
                                      className={`primary-input 
                                      ${
                                        formik.touched.modelDetails &&
                                        (
                                          formik.touched
                                            .modelDetails as FormikTouched<
                                            FormValues['modelDetails']
                                          >
                                        )?.[index]?.name &&
                                        (
                                          formik.errors
                                            .modelDetails as FormikErrors<
                                            FormValues['modelDetails']
                                          >
                                        )?.[index]?.name
                                          ? 'border-red-500'
                                          : ''
                                      }`}
                                    />
                                    <textarea
                                      name={`modelDetails[${index}].detail`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.modelDetails[index].detail
                                      }
                                      placeholder="Description on Sub Category"
                                      className={`primary-input 
                                        ${
                                          formik.touched.modelDetails &&
                                          (
                                            formik.touched
                                              .modelDetails as FormikTouched<
                                              FormValues['modelDetails']
                                            >
                                          )?.[index]?.detail &&
                                          (
                                            formik.errors
                                              .modelDetails as FormikErrors<
                                              FormValues['modelDetails']
                                            >
                                          )?.[index]?.detail
                                            ? 'border-red-500'
                                            : ''
                                        }`}
                                    />
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 errorColor border-blue-500 px-4 py-2 "
                                  >
                                    <RxCross2
                                      className="errorColor"
                                      size={25}
                                    />
                                  </button>
                                </>
                              ),
                            )}

                            <button
                              type="button"
                              onClick={() => push({ name: '', detail: '' })}
                              className="dashboard_primary_button"
                            >
                              Add Model
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium">colors</h3>
                    </div>
                    <div className="flex flex-col py-4 px-4">
                      <FieldArray name="colors">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.colors &&
                              formik.values.colors.map(
                                (model: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="text"
                                      name={`colors[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik?.values?.colors?.[index].name
                                      }
                                      placeholder="Heading name"
                                      className="primary-input"
                                    />
                                    <input
                                      type="text"
                                      name={`colors[${index}].detail`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.colors?.[index].detail
                                      }
                                      placeholder="details text"
                                      className="primary-input"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className=" errorColor "
                                    >
                                      <RxCross2
                                        className="errorColor"
                                        size={25}
                                      />
                                    </button>
                                  </div>
                                ),
                              )}
                            <button
                              type="button"
                              onClick={() => push({ name: '', detail: '' })}
                              className="dashboard_primary_button"
                            >
                              colors
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke dark:border-strokedark ">
                    <div className="border-b bg-primary border-stroke py-4 px-2  ">
                      <h3 className="font-medium text-white">Add Vidoes</h3>
                    </div>
                    {videos?.[0] && videos?.length > 0 ? (
                      <div className=" p-4 bg-primary">
                        {videos.map((item: any, index: number) => {
                          return (
                            <div
                              className="relative border group bg-primary rounded-lg w-fit  overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
                              key={index}
                            >
                              <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full cursor-pointer z-20">
                                <RxCross2
                                  className="cursor-pointer borde errorColor"
                                  size={25}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    ImageRemoveHandler(
                                      item.public_id,
                                      setvideos,
                                    );
                                  }}
                                />
                              </div>

                              <video
                                key={index}
                                src={item?.imageUrl || ''}
                                height={200}
                                width={200}
                                className="w-full h-full max-h-[300] max-w-full dark:bg-black dark:shadow-lg"
                                autoPlay
                                muted
                                controls
                              ></video>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Imageupload setImagesUrl={setvideos} video s3Flag />
                    )}
                  </div>
                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Colors Images
                      </h3>
                    </div>
                    <Imageupload setImagesUrl={setcolorsImages} multiple />
                    {colorsImages && colorsImages?.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                          {colorsImages.map((item: any, index) => {
                            return (
                             <>
                              <div>
                                <div
                                  className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                  key={index}
                                >
                                  <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full">
                                    <RxCross2
                                      className="cursor-pointer errorColor hover:errorColor-700"
                                      size={17}
                                      onClick={() => {
                                        ImageRemoveHandler(
                                          item.public_id,
                                          setcolorsImages,
                                        );
                                      }}
                                    />
                                  </div>
                                  <Image
                                    key={index}
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={400}
                                    src={item?.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>
                                <input
                                  className="primary-input"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item.altText}
                                  onChange={(e) =>
                                    handlecolorChange(
                                      index,
                                      String(e.target.value),
                                      setcolorsImages,
                                    )
                                  }
                                />

                              </div>
                              </>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Top Images
                      </h3>
                    </div>
                    <Imageupload setImagesUrl={settopImages} />
                    {topImages && topImages?.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                        <div>
                          {topImages.map((item: any, index) => {
                            return (
                              <>
                                <div
                                  className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                  key={index}
                                >
                                  <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full">
                                    <RxCross2
                                      className="cursor-pointer errorColor hover:errorColor-700"
                                      size={17}
                                      onClick={() => {
                                        ImageRemoveHandler(
                                          item.public_id,
                                          settopImages,
                                        );
                                      }}
                                    />
                                  </div>
                                  <Image
                                    key={index}
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={400}
                                    src={item?.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>

                                <input
                                  className="primary-input"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item.altText}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      settopImages,
                                      'altText',
                                    )
                                  }
                                />
                                <input
                                  className="primary-input"
                                  placeholder="Name"
                                  type="text"
                                  name="name"
                                  value={item.name}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      settopImages,
                                      'name',
                                    )
                                  }
                                />
                              </>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        subCategoryImage
                      </h3>
                    </div>
                    {subCategoryImage && subCategoryImage?.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                        <div>
                          {subCategoryImage.map((item: any, index) => {
                            return (
                              <>
                                <div
                                  className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                  key={index}
                                >
                                  <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full">
                                    <RxCross2
                                      className="cursor-pointer errorColor hover:errorColor-700"
                                      size={17}
                                      onClick={() => {
                                        ImageRemoveHandler(
                                          item.public_id,
                                          setsubCategoryImage,
                                        );
                                      }}
                                    />
                                  </div>
                                  <Image
                                    key={index}
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={400}
                                    src={item?.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>

                                <input
                                  className="primary-input"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item.altText}
                                  onChange={(e) =>
                                     handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setsubCategoryImage,
                                      'altText',
                                    )
                               
                                  }
                                />
                              </>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <Imageupload setposterimageUrl={setsubCategoryImage} />
                    )}
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Banner Image
                      </h3>
                    </div>
                    {bannerImageUrl && bannerImageUrl?.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                        <div>
                          {bannerImageUrl.map((item: any, index) => {
                            return (
                              <>
                                <div
                                  className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                  key={index}
                                >
                                  <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full">
                                    <RxCross2
                                      className="cursor-pointer errorColor hover:errorColor-700"
                                      size={17}
                                      onClick={() => {
                                        ImageRemoveHandler(
                                          item.public_id,
                                          setBannerImageUrl,
                                        );
                                      }}
                                    />
                                  </div>
                                  <Image
                                    key={index}
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={400}
                                    src={item?.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>

                                <input
                                  className="primary-input"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item.altText}
                                  onChange={(e) =>
                                      handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setBannerImageUrl,
                                      'altText',
                                    )
                                 
                                  }
                                />
                              </>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <Imageupload setposterimageUrl={setBannerImageUrl} />
                    )}
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        privarcy Image
                      </h3>
                    </div>
                    {privarcyImagemageUrl &&
                    privarcyImagemageUrl?.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                        <div>
                          {privarcyImagemageUrl.map((item: any, index) => {
                            return (
                              <>
                                <div
                                  className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                  key={index}
                                >
                                  <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full">
                                    <RxCross2
                                      className="cursor-pointer errorColor hover:errorColor-700"
                                      size={17}
                                      onClick={() => {
                                        ImageRemoveHandler(
                                          item.public_id,
                                          setprivarcyImage,
                                        );
                                      }}
                                    />
                                  </div>
                                  <Image
                                    key={index}
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={400}
                                    src={item?.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>

                                <input
                                  className="primary-input"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item.altText}
                                  onChange={(e) =>
                                      handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setprivarcyImage,
                                      'altText',
                                    )
                              
                                  }
                                />
                              </>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <Imageupload setposterimageUrl={setprivarcyImage} />
                    )}
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Product Images
                      </h3>
                    </div>
                    <Imageupload setImagesUrl={setImagesUrl} />
                    {imagesUrl && imagesUrl.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {imagesUrl.map((item: any, index) => {
                          return (
                            <div
                              key={index}
                              draggable
                              onDragStart={() => (dragImage.current = index)}
                              onDragEnter={() =>
                                (draggedOverImage.current = index)
                              }
                              onDragEnd={handleSort}
                              onDragOver={(e) => e.preventDefault()}
                            >
                              <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                                <div
                                  className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full z-10"
                                  draggable
                                >
                                  <RxCross2
                                    className="cursor-pointer btext-red-500 hover:errorColor-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setImagesUrl,
                                      );
                                    }}
                                  />
                                </div>
                                <div key={index} className=" relative ">
                                  <div className="h-[100px] w-full overflow-hidden">
                                    <Image
                                      className="object-cover w-full h-full"
                                      width={300}
                                      height={200}
                                      src={item.imageUrl}
                                      alt={`productImage-${index}`}
                                    />
                                  </div>

                           
                                </div>
                              </div>
                              <input
                                className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 bg-white dark:border-strokedark dark:bg-lightdark focus:border-primary active:border-primary outline-none"
                                placeholder="altText"
                                type="text"
                                name="altText"
                                value={item.altText}
                                onChange={(e) =>
                                     handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setImagesUrl,
                                      'altText',
                                    )                                  
                                }
                              />
                              <input
                                className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 bg-white dark:border-strokedark dark:bg-lightdark focus:border-primary active:border-primary outline-none"
                                placeholder="altText"
                                type="text"
                                name="colorCode"
                                value={item.colorCode}
                                onChange={(e) =>
                                  
                                     handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setImagesUrl,
                                      'colorCode',
                                    )
                            
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {imgError ? (
                <div className="flex justify-center">
                  <div className="errorColor pt-2 pb-2">{imgError}</div>
                </div>
              ) : null}

              <button type="submit" className="dashboard_primary_button">
                {loading ? <Loader color="#fff" /> : 'Submit'}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormElements;
