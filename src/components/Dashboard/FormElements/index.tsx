'use client';

import React, { useState, useEffect, SetStateAction, useRef } from 'react';
import { Formik, FieldArray, Form } from 'formik';

import Imageupload from 'components/ImageUpload/Imageupload';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { compareImageArray, compareImages, handleImageAltText, ImageRemoveHandler } from 'utils/helperFunctions';
import { ADDPRODUCTFORMPROPS, Product } from 'types/interfaces';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import Cookies from 'js-cookie';

import {
  AddProductvalidationSchema,
  AddproductsinitialValues,
} from 'data/data';
import { ICategory } from 'types/types';
import revalidateTag from 'components/ServerActons/ServerAction';
import TopButton from '../Layouts/TopButton';
import Checkbox from 'components/ui/Checkbox';
import Input from 'components/ui/Input';
import ImageTextInput from 'components/Common/regularInputs/ImageTextInput';
import { useConfirmModal } from 'components/ui/useConfirmModal';
import { showAlert } from 'utils/Alert';

const FormElements: React.FC<ADDPRODUCTFORMPROPS> = ({
  EditInitialValues,
  setselecteMenu,
  setEditProduct,
  categoriesList,
  subCategoriesList
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
    EditInitialValues?.privarcyImage && [EditInitialValues.privarcyImage] || [],
  );

  const [subCategoryImage, setsubCategoryImage] = useState<any[] | undefined>((EditInitialValues &&
    EditInitialValues.subCategoryImage) ? EditInitialValues.subCategoryImage : []
  );

  console.log(subCategoryImage, 'subCategoryImage', EditInitialValues.subCategoryImage)


  const [topImages, settopImages] = useState<any[]>(EditInitialValues && EditInitialValues.topImages && EditInitialValues.topImages || []);
  const [colorsImages, setcolorsImages] = useState<any[]>(
    EditInitialValues &&
    EditInitialValues.colorsImages &&
    EditInitialValues.colorsImages || []
  );
  const [productUpdateFlat, setProductUpdateFlat] = useState(false);
  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<any | null | undefined>(EditInitialValues ? EditInitialValues : AddproductsinitialValues);

  const [imgError, setError] = useState<string | null | undefined>();

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<number[]>([]);

  const [previousSelectedCategories, setpreviousSelectedCategories] = useState<number[]>([]);
  const dragImage = useRef<number | null>(null);
  const draggedOverImage = useRef<number | null>(null);
  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  let finalToken = token ? token : superAdminToken;
  const { confirm, modalNode } = useConfirmModal();
  const formikValuesRef = useRef<Product>(EditInitialValues ? EditInitialValues : AddproductsinitialValues);

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
          EditInitialValues.subCategoryImage &&
          EditInitialValues.subCategoryImage);

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
      let privarcyImage = privarcyImagemageUrl && privarcyImagemageUrl[0];
      if (!posterImageUrl || !(imagesUrl) || !(imagesUrl?.length > 0)) {
        return showAlert({
        title: "Please select relevant Images",
        icon: "warning",
      });
      }

      let newValues = {
        ...values,
        title: values.name,
        posterImage: posterImageUrl,
        bannerImage: bannerImage !== undefined ? bannerImage : null,
        privarcyImage: privarcyImage !== undefined ? privarcyImage : null,
        subCategoryImage,
        videos: videos,
        colorsImages: colorsImages,
        topImages: topImages,
        imageUrls: imagesUrl,
        Meta_description: values.Meta_Description,
        price: 2
      };

      console.log(values, "values")

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
      showAlert({
        title: `Product has been successfully ${updateFlag ? "updated!" : "added!"}`,
        icon: "success",
      });
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

  const [filteredSubcategories, setFilteredSubcategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const filteredSubcategories = subCategoriesList.filter((subcategory) =>
      selectedCategoryIds.includes(subcategory.CategoryId),
    );
    setFilteredSubcategories(filteredSubcategories);
  }, [selectedCategoryIds, categoriesList]);


  const hasUnsavedChanges = (): boolean => {
    if (!EditInitialValues) return false;

    const oldPoster = EditInitialValues.posterImage;
    const newPoster = posterimageUrl?.[0];
    const isPosterChanged = compareImages(oldPoster, newPoster);

    const oldBanner = EditInitialValues.bannerImage;
    const newBanner = bannerImageUrl?.[0];
    const isBannerChanged = compareImages(oldBanner, newBanner);

    const oldPrivacy = EditInitialValues.privarcyImage;
    const newPrivacy = privarcyImagemageUrl?.[0];
    const isPrivacyChanged = compareImages(oldPrivacy, newPrivacy);

    const isVideosChanged = compareImageArray(EditInitialValues.videos ?? [], videos);
    const isTopImagesChanged = compareImageArray(EditInitialValues.topImages ?? [], topImages);
    const isColorsImagesChanged = compareImageArray(EditInitialValues.colorsImages ?? [], colorsImages);
    const isSubCategoryImagesChanged = compareImageArray(EditInitialValues.subCategoryImage ?? [], subCategoryImage);
    const isImagesUrlChanged = compareImageArray(EditInitialValues.imageUrls ?? [], imagesUrl);
    const isCategoryChanged = (EditInitialValues.category ? EditInitialValues.category : undefined) !== selectedCategoryIds[0];
    const isSubCategoryChanged = (() => {
      const a = (EditInitialValues.subCategory?.map((sc: any) => sc.id) ?? []).sort();
      const b = selectedSubcategoryIds.slice().sort();

      if (a.length !== b.length) return true;

      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return true;
      }

      return false;
    })();
    // eslint-disable-next-line
    const { videos: _v1, topImages: _t1, colorsImages: _c1, subCategoryImage: _s1, imageUrls: _i1, posterImage: _p1, privarcyImage: _pr1, bannerImage: _b1, subCategory: _sub1, category: _category , ...newInitialValues } = productInitialValue;
    // eslint-disable-next-line
    const { videos: _v2, topImages: _t2, colorsImages: _c2, subCategoryImage: _s2, imageUrls: _i2, posterImage: _p2, privarcyImage: _pr2, bannerImage: _b2, subCategory: _sub2, category, ...current } = formikValuesRef.current as any;

    const values = {
      ...newInitialValues,
      name: EditInitialValues.name,
    };

    const normalizedInitial = JSON.stringify(values);
    const normalizedCurrent = JSON.stringify(current);

    const isFormChanged = normalizedInitial !== normalizedCurrent;
    console.log(values, current , 'isFormChanged')

    return (
      isPosterChanged ||
      isBannerChanged ||
      isPrivacyChanged ||
      isVideosChanged ||
      isTopImagesChanged ||
      isColorsImagesChanged ||
      isSubCategoryImagesChanged ||
      isImagesUrlChanged ||
      isCategoryChanged ||
      isSubCategoryChanged ||
      isFormChanged
    );
  };




  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    const handlePopState = () => {
      if (hasUnsavedChanges()) {
        window.history.pushState(null, '', window.location.href);
        confirm({
          title: "Unsaved Changes",
          content: "You have unsaved changes. Do you want to discard them?",
          okText: "Discard Changes",
          cancelText: "Cancel",
          onOk: () => setselecteMenu("Categories"),
        });
      } else { setselecteMenu("All Categories"); }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [productInitialValue, posterimageUrl]);

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      confirm({
        title: "Unsaved Changes",
        content: "You have unsaved changes. Do you want to discard them?",
        okText: "Discard Changes",
        cancelText: "Cancel",
        onOk: () => setselecteMenu("Categories"),
      });
      return;
    }

    setselecteMenu("Categories");
  };

  return (
    <>
      {modalNode}
      <Formik
        enableReinitialize
        initialValues={
          productInitialValue ? productInitialValue : AddproductsinitialValues
        }
        validationSchema={AddProductvalidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          formikValuesRef.current = formik.values;
          return (
            <Form onSubmit={formik.handleSubmit}>
              <TopButton handleBack={handleBack} loading={loading} />

              <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mt-3">
                <div className="flex flex-col gap-9 dark:border-strokedark dark:bg-lightdark ">
                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark p-2 ">
                    <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                      <div className="inputs_heading border-stroke dark:border-strokedark">
                        <h3 className="label_main">
                          Poster Image
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl?.length > 0 ? (
                        <div className="form_element_main">
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
                                <ImageTextInput
                                  name="altText"
                                  value={item.altText}
                                  placeholder="altText"
                                  onChange={(val) =>
                                    handleImageAltText(index, val, setposterimageUrl, "altText")
                                  }
                                />

                                <ImageTextInput
                                  name="pricing"
                                  value={item.pricing}
                                  placeholder="pricing"
                                  onChange={(val) =>
                                    handleImageAltText(index, val, setposterimageUrl, "pricing")
                                  }
                                />

                                <ImageTextInput
                                  name="dimentions"
                                  value={item.dimentions}
                                  placeholder="dimentions"
                                  onChange={(val) =>
                                    handleImageAltText(index, val, setposterimageUrl, "dimentions")
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
                      <Input
                        label="Product Name"
                        name="name"
                        placeholder="Product Name"
                      />

                      <div className="flex  gap-2 flex-nowrap mad:flex-wrap">
                        <Input
                          label="Description"
                          name="description"
                          placeholder="Description"
                          textarea
                        />
                        <Input
                          label="Short Description"
                          name="short_description"
                          placeholder="Short Description"
                          textarea
                        />

                      </div>
                      <Input
                        label="Heading"
                        name="heading"
                        placeholder="Heading"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="customUrl"
                          name="customUrl"
                          placeholder="customUrl"
                        />
                        <Input
                          label="breadcurum"
                          name="breadcurum"
                          placeholder="breadcurum"
                        />
                        <Input
                          label="topHeading"
                          name="topHeading"
                          placeholder="topHeading"
                        />
                        <Input
                          label="mainHeading"
                          name="mainHeading"
                          placeholder="mainHeading"
                        />
                        <Input
                          label="Sale Price"
                          name="salePrice"
                          placeholder="Sale Price"
                          type='number'
                        />
                        <Input
                          label="Discount Price"
                          name="discountPrice"
                          placeholder="Discount Price"
                        />
                      </div>

                      <div className="w-full">
                        <label className="mb-3 block py-4 px-2 text-sm label_main">
                          Select Parent Category (at least one)
                        </label>
                        {categoriesList.length === 0 ? (
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

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Meta Title"
                          name="Meta_Title"
                          placeholder="Meta Title"
                        />
                        <Input
                          label="Canonical Tag"
                          name="Canonical_Tag"
                          placeholder="Canonical Tag"
                        />

                      </div>
                      <Input
                        label="Meta Description"
                        name="Meta_Description"
                        placeholder="Meta Description"
                        textarea
                      />
                      <Input
                        label="Images Alt Text"
                        name="Images_Alt_Text"
                        placeholder="Images Alt Text"
                      />

                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                    <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="label_main">
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
                                    <Input name={`faqs[${index}].specsHeading`} placeholder="FAQS Heading" />
                                    <Input name={`faqs[${index}].specsDetails`} placeholder="FAQS Details" />

                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="crose_button"
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
                    <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="label_main">
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
                                    <Input name={`privacySectoin[${index}].specsHeading`} placeholder="privacySectoin Heading" />
                                    <Input name={`privacySectoin[${index}].specsDetails`} placeholder="privacySectoin Details" />

                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="crose_button"
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

                  <div className="grid grid-cols-2  gap-4">
                    <Input name="Sub_Heading" placeholder="Sub Heading" textarea />
                    <Input name="Sub_Heading_description" placeholder="Sub Heading Description" textarea />

                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                   <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="label_main">
                        Descripton(On Subcategory Page)
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5 p-2">
                      <FieldArray name="modelDetails">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2 ">
                            <div className='shadow-md p-2 rounded relative'>
                              {formik.values?.modelDetails?.map(
                                (model: any, index: any) => (
                                  <>
                                    <div
                                      key={index}
                                      className="flex flex-col gap-3 pt-3 "
                                    >
                                      <Input name={`modelDetails[${index}].name`} placeholder="Sub Category Name" />
                                      <Input name={`modelDetails[${index}].detail`} placeholder="Description on Sub Category" textarea />


                                    </div>

                                    <div className='relative'>
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="crose_button border-blue-500  absolute -top-48 -right-3 z-10"
                                      >
                                        <RxCross2
                                          className="errorColor"
                                          size={25}
                                        />
                                      </button>
                                    </div>
                                  </>
                                ),
                              )}
                            </div>

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
                    <div className="inputs_heading border-stroke dark:border-strokedark">
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
                                    <Input name={`colors[${index}].name`} placeholder="Heading name" />
                                    <Input name={`colors[${index}].detail`} placeholder="details text" />

                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="crose_button"
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
                  <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="font-medium">Add Vidoes</h3>
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
                    <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="label_main">
                        Colors Images
                      </h3>
                    </div>
                    <Imageupload setImagesUrl={setcolorsImages} multiple />
                    {colorsImages && colorsImages?.length > 0 && (
                      <div className="form_element_main">
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
                    <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="label_main">
                        Top Images
                      </h3>
                    </div>
                    <Imageupload setImagesUrl={settopImages} />
                    {topImages && topImages?.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4  gap-4 p-4">

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
                                  className="object-cover h-10 w-10"
                                  width={300}
                                  height={400}
                                  src={item?.imageUrl}
                                  alt={`productImage-${index}`}
                                />
                                <ImageTextInput
                                  name="altText"
                                  value={item.altText}
                                  placeholder="altText"
                                  onChange={(val) =>
                                    handleImageAltText(index, val, settopImages, "altText")
                                  }
                                />
                                <ImageTextInput
                                  name="name"
                                  value={item.name}
                                  placeholder="Icon Name"
                                  onChange={(val) =>
                                    handleImageAltText(index, val, settopImages, "name")
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
                    <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="label_main">
                        subCategoryImage
                      </h3>
                    </div>
                    {subCategoryImage && subCategoryImage?.length > 0 ? (
                      <div className="form_element_main">
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

                                <ImageTextInput
                                  name="altText"
                                  value={item.altText}
                                  placeholder="altText"
                                  onChange={(val) =>
                                    handleImageAltText(index, val, setsubCategoryImage, "altText")
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
                    <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="label_main">
                        Banner Image
                      </h3>
                    </div>
                    {bannerImageUrl && bannerImageUrl?.length > 0 ? (
                      <div className="form_element_main">
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
                                <ImageTextInput
                                  name="altText"
                                  value={item.altText}
                                  placeholder="altText"
                                  onChange={(val) =>
                                    handleImageAltText(index, val, setBannerImageUrl, "altText")
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
                    <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="label_main">
                        privarcy Image
                      </h3>
                    </div>
                    {privarcyImagemageUrl &&
                      privarcyImagemageUrl?.length > 0 ? (
                      <div className="form_element_main">
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

                                <ImageTextInput
                                  name="altText"
                                  value={item.altText}
                                  placeholder="altText"
                                  onChange={(val) =>
                                    handleImageAltText(index, val, setprivarcyImage, "altText")
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
                    <div className="inputs_heading border-stroke dark:border-strokedark">
                      <h3 className="label_main">
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
                              <ImageTextInput
                                name="altText"
                                value={item.altText}
                                placeholder="altText"
                                onChange={(val) =>
                                  handleImageAltText(index, val, setImagesUrl, "altText")
                                }
                              />
                              <ImageTextInput
                                name="colorCode"
                                value={item.colorCode}
                                placeholder="colorCode"
                                onChange={(val) =>
                                  handleImageAltText(index, val, setImagesUrl, "colorCode")
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
