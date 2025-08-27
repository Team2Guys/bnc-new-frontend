'use client';
import React, { SetStateAction, useLayoutEffect, useState } from 'react';
import Imageupload from 'components/ImageUpload/Imageupload';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { ImageRemoveHandler } from 'utils/helperFunctions';

import Toaster from 'components/Toaster/Toaster';
import axios from 'axios';
import { Formik, Form, FieldArray } from 'formik';

import { categoryInitialValues, categoryValidationSchema } from 'data/data';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import Loader from 'components/Loader/Loader';
import { Category } from 'types/interfaces';
import Cookies from 'js-cookie';
import revalidateTag from 'components/ServerActons/ServerAction';
import { Status } from 'types/types';
import TopButton from 'components/Dashboard/Layouts/TopButton';
import Input from 'components/ui/Input';
import ImageTextInput from 'components/Common/regularInputs/ImageTextInput';
interface editCategoryNameType {
  name: string;
  description: string;
  Meta_Title?: string;
  Meta_description?: string;
  Canonical_Tag?: string;
  Images_Alt_Text?: string;

  topHeading?: string;

  headingchecks: any[]
  breakcrum?: string;

  productpageHeading?: string;
  faqHeadingS?: string;

  faqs: any[]
  faqHeading?: string

  productCustomUrl?: string
  categoryCustomUrl?: string
  status: Status;

}

interface editCategoryProps {
  seteditCategory: any;
  editCategory: any;
  setMenuType: React.Dispatch<SetStateAction<string>>;

}

const FormLayout = ({
  seteditCategory,
  editCategory,
  setMenuType,
}: editCategoryProps) => {
  const admin_token = Cookies.get('2guysAdminToken');
  const super_admin_token = Cookies.get('superAdminToken');

  let token = admin_token ? admin_token : super_admin_token;

  let CategoryName = editCategory && editCategory.title ? { name: editCategory.title, description: editCategory.description } : null;
  let CategorImageUrl = editCategory && editCategory.posterImage;
  const [posterimageUrl, setposterimageUrl] = useState<any[] | undefined>(CategorImageUrl ? [CategorImageUrl] : undefined);

  const [bannerImageUrl, setBannerImageUrl] = useState<any[] | undefined>(
    editCategory && editCategory.bannerImage && [editCategory.bannerImage],
  );

  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<
    editCategoryNameType | undefined
  >({
    ...CategoryName,
    name: CategoryName?.name || '',
    faqHeading: editCategory?.faqHeading || '',
    topHeading: editCategory?.topHeading || '',
    breakcrum: editCategory?.breakcrum || '',
    productpageHeading: editCategory?.productpageHeading || '',
    headingchecks: editCategory?.headingchecks || [],
    faqs: editCategory?.faqs || [],
    description: CategoryName?.description || '',
    Images_Alt_Text: editCategory?.Images_Alt_Text ?? '',
    Canonical_Tag: editCategory?.Canonical_Tag ?? '',
    Meta_Title: editCategory?.Meta_Title ?? '',
    Meta_description: editCategory?.Meta_description ?? '',
    productCustomUrl: editCategory?.productCustomUrl ?? "",
    categoryCustomUrl: editCategory?.categoryCustomUrl ?? "",
    status: editCategory?.status || 'PUBLISHED',

  });

  const onSubmit = async (values: Category, { resetForm }: any) => {

    try {
      setloading(true);
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      let bannerImage = bannerImageUrl && bannerImageUrl[0];
      if (!posterImageUrl) throw new Error('Please select relevant Images');
      let { name, ...newValue } = {
        ...values,
        title: values.name,
        posterImage: posterImageUrl,
        bannerImage: bannerImage !== undefined ? bannerImage : null,
      };
      console.log(name, 'name');
      let updateFlag = CategoryName ? true : false;
      let addProductUrl = updateFlag
        ? `/api/categories/updateCategory/${editCategory.id} `
        : null;
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${updateFlag ? addProductUrl : '/api/categories/AddCategory'
        }`;
      console.log(newValue, 'newValue')
      if (updateFlag) {
        await axios.put(url, newValue, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(url, newValue, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setloading(false);
      Toaster(
        'success',
        updateFlag
          ? 'Category has been sucessufully updated !'
          : 'Category has been sucessufully Created !',
      );
      updateFlag ? seteditCategory(null) : null;
      setposterimageUrl(undefined);
      setBannerImageUrl(undefined);
      revalidateTag("categories")
      resetForm();
      setMenuType('Categories');
    } catch (err) {
      console.log('error occurred', err);
      setloading(false);
    }
  };

  console.log(setEditCategoryName, 'setEditCategoryName');

  useLayoutEffect(() => {
    const CategoryHandler = async () => {
      try {
        if (!editCategory) return;

        const {
          posterImage,
          imageUrls,
          _id,
          createdAt,
          updatedAt,
          CategoryId,
          SubCategoryId,
          __v,
          ...EditInitialProductValues
        } = editCategory as any;

        console.log(
          editCategory,
          posterImage,
          imageUrls,
          _id,
          createdAt,
          updatedAt,
          CategoryId,
          SubCategoryId,
          __v,
          ...EditInitialProductValues,
        );
      } catch (err) {
        console.log(err, 'err');
      }
    };

    CategoryHandler();
  }, []);

  const handlealtTextposterimageUrl = (index: number, newaltText: string) => {
    //@ts-expect-error
    const updatedImagesUrl = posterimageUrl.map((item, i) =>
      i === index ? { ...item, altText: newaltText } : item,
    );
    setposterimageUrl(updatedImagesUrl);
  };
  const handlealtTextbannerImageUrl = (index: number, newaltText: string) => {
    //@ts-expect-error
    const updatedImagesUrl = bannerImageUrl.map((item, i) =>
      i === index ? { ...item, altText: newaltText } : item,
    );
    setBannerImageUrl(updatedImagesUrl);
  };
  return (
    <>


      <Formik
        initialValues={
          editCategoryName ? editCategoryName : categoryInitialValues
        }
        validationSchema={categoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <TopButton setMenuType={setMenuType} loading={loading} />

              <div className="flex justify-center ">
                <div className="flex flex-col gap-9 w-2/5 dark:border-strokedark dark:bg-lightdark rounded-md">
                  <div className="rounded-md  bg-white   dark:bg-lightdark p-4">
                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-lightdark">
                      <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Category Images
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                          {posterimageUrl.map((item: any, index) => {
                            return (
                              <div key={index}>
                                <div className="relative group rounded-lg overflow-hidden shadow-md bg-white  transform transition-transform duration-300 hover:scale-105">
                                  <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full">
                                    <RxCross2
                                      className="cursor-pointer text-red-500 hover:text-red-700"
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
                                    height={200}
                                    src={item.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>
                                <ImageTextInput
                                  name="altText"
                                  value={item.altText}
                                  placeholder="altText"
                                  className="border rounded p-2 focus:outline-none mt-1"
                                  onChange={(val) => handlealtTextposterimageUrl(index, val)}
                                />

                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <Imageupload setposterimageUrl={setposterimageUrl} />
                      )}
                    </div>
                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-lightdark">
                      <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Banner Images for Blogs
                        </h3>
                      </div>
                      {bannerImageUrl && bannerImageUrl.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                          {bannerImageUrl.map((item: any, index) => {
                            return (
                              <div key={index}>
                                <div className="relative group rounded-lg overflow-hidden shadow-md bg-white  transform transition-transform duration-300 hover:scale-105">
                                  <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full">
                                    <RxCross2
                                      className="cursor-pointer text-red-500 hover:text-red-700"
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
                                    height={200}
                                    src={item.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>
                                <ImageTextInput
                                  name="altText"
                                  value={item.altText}
                                  placeholder="Alt text"
                                  onChange={(val) => handlealtTextbannerImageUrl(index, val)}
                                  className='border rounded p-2 focus:outline-none mt-1'
                                />

                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <Imageupload setposterimageUrl={setBannerImageUrl} />
                      )}
                    </div>

                    <div className="flex flex-col space-y-3 mt-2">


                      <div className=' flex flex-wrap md:flex-nowrap gap-4'>
                        <Input
                          label="Category Title"
                          name="name"
                          placeholder="Title"
                        />
                        <Input
                          label="Top Heading"
                          name="topHeading"
                          placeholder="Top Heading"
                        />
                      </div>
                      <Input
                        label="Product Page Heading"
                        name="productpageHeading"
                        placeholder="Product Page Heading"
                      />

                      <div className='flex gap-4 mt-2 flex-wrap md:flex-nowrap'>
                        <Input
                          label="breadCrumb"
                          name="breakcrum"
                          placeholder="breadCrumb"
                        />
                        <Input
                          label="productCustomUrl"
                          name="productCustomUrl"
                          placeholder="productCustomUrl"
                        />
                        <Input
                          label="categoryCustomUrl"
                          name="categoryCustomUrl"
                          placeholder="categoryCustomUrl"
                        />
                      </div>
                      <Input
                        label="Faq Heading"
                        name="faqHeading"
                        placeholder="Faq Heading"
                      />


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
                                        <Input
                                          name={`faqs[${index}].specsHeading`}
                                          placeholder="FAQS Heading"
                                        />
                                        <Input
                                          name={`faqs[${index}].specsDetails`}
                                          placeholder="FAQS Details"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className="ml-2 text-red"
                                        >
                                          <RxCross2
                                            className="text-red"
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
                            heading checks
                          </h3>
                        </div>
                        <div className="flex flex-col gap-4 p-4">
                          <FieldArray name="headingchecks">
                            {({ push, remove }) => (
                              <div className="flex flex-col gap-2">
                                {formik.values.headingchecks &&
                                  formik.values.headingchecks.map(
                                    (spec: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex items-center"
                                      >
                                        <Input
                                          name={`headingchecks[${index}].specsDetails`}
                                          placeholder="heading checks Details"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className="ml-2 text-red"
                                        >
                                          <RxCross2
                                            className="text-red"
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
                                  Add heading checks
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      </div>

                      <Input
                        label="Category Description"
                        name="description"
                        placeholder="Write something..."
                        textarea
                      />

                      <div className="flex gap-4 mt-4">
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
                        name="Meta_description"
                        placeholder="Write something..."
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
              </div>


              <div className="flex justify-center">
                <button
                  type="submit"
                  className="dashboard_primary_button "
                >
                  {loading ? <Loader color="#fff" /> : 'Submit'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ProtectedRoute(FormLayout);
