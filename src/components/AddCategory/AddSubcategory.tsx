'use client';
import React, { SetStateAction, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { ICategory, ISUBCATEGORY } from 'types/types';
import showToast from 'components/Toaster/Toaster';
import Imageupload from 'components/ImageUpload/Imageupload';
import {
  subcategoryValidationSchema,
  subcategoryInitialValues,
} from 'data/data';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import Loader from 'components/Loader/Loader';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { Checkbox } from 'antd';
import Cookies from 'js-cookie';
import revalidateTag from 'components/ServerActons/ServerAction';
import TopButton from 'components/Dashboard/Layouts/TopButton';

interface editCategoryNameType {
  title: string;
  description: string;
  short_description?: string;
  CategoryId: undefined;
  Meta_Title?: string;
  Meta_description?: string;
  Canonical_Tag?: string;
  Images_Alt_Text?: string;
}

interface editCategoryProps {
  seteditCategory: any;
  editCategory: any;
  setMenuType: React.Dispatch<SetStateAction<string>>;
  categoriesList?: ICategory[] | undefined;
}

const FormLayout = ({
  seteditCategory,
  editCategory,
  setMenuType,
  categoriesList
}: editCategoryProps) => {
  const admin_token = Cookies.get('2guysAdminToken');
  const super_admin_token = Cookies.get('superAdminToken');

  let token = admin_token ? admin_token : super_admin_token;

  let CategoryName =
    editCategory && editCategory.title
      ? {
        title: editCategory.title,
        description: editCategory.description,
        short_description: editCategory.short_description,
        CategoryId: editCategory.CategoryId || undefined,
        Images_Alt_Text: editCategory?.Images_Alt_Text,
        Canonical_Tag: editCategory?.Canonical_Tag,
        Meta_Title: editCategory?.Meta_Title,
        Meta_description: editCategory?.Meta_description,
        status: editCategory?.status,
      }
      : null;
  let CategorImageUrl = editCategory && editCategory.posterImage;
  const [posterimageUrl, setposterimageUrl] = useState<any[] | undefined>(CategorImageUrl ? [CategorImageUrl] : undefined);
  const [bannerImageUrl, setBannerImageUrl] = useState<any[] | undefined>(editCategory && editCategory.bannerImage && [editCategory.bannerImage],
  );
  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<editCategoryNameType | null | undefined>(CategoryName);

  const onSubmit = async (values: ISUBCATEGORY, { resetForm }: any) => {
    console.log(values, 'values');
    if (values.CategoryId === undefined) {
      return showToast('warn', 'Select parent category😟');
    }
    try {
      setloading(true);
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      let bannerImage = bannerImageUrl && bannerImageUrl[0];
      if (!posterImageUrl) {
        setloading(false);
        return showToast('warn', 'Make sure Image is selected😴');
      }
      console.log(bannerImage + 'bannerImage');
      let { CategoryId, ...newValue } = {
        ...values,
        posterImage: posterImageUrl,
        bannerImage: bannerImage !== undefined ? bannerImage : null,
        category: {
          connect: { id: values.CategoryId },
        },
      };
      console.log(CategoryId, 'CategoryId');
      let updateFlag = editCategoryName ? true : false;
      let addProductUrl = updateFlag
        ? `/api/categories/updatesubCategory/${editCategory.id}`
        : null;
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${updateFlag ? addProductUrl : '/api/categories/Addsubcategory'
        }`;

      let response;
      if (updateFlag) {
        response = await axios.put(url, newValue, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMenuType('Categories');
        seteditCategory(null);
        setEditCategoryName(null);
      } else {
        response = await axios.post(url, newValue, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      console.log(response, 'response');
      revalidateTag('subCategories');

      showToast(
        'success',
        updateFlag
          ? 'Sub Category has been sucessufully Updated🎉'
          : 'Sub Category has been sucessufully Created🎉',
      );
      setloading(false);

      setposterimageUrl(undefined);
      setBannerImageUrl(undefined);
      console.log('Before Reset form');
      resetForm();
      console.log('After Reset form');
    } catch (err) {
      console.log('error occurred', err);
      setloading(false);
    }
  };


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
          editCategoryName ? editCategoryName : subcategoryInitialValues
        }
        validationSchema={subcategoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>


                              <TopButton  setMenuType={setMenuType} loading={loading}/>

              <div className="flex justify-center  dark:text-white  ">
                <div className="flex flex-col gap-9 w-2/5   dark:text-white  dark:border-white">
                  <div className="rounded-md e bg-white  dark:bg-lightdark dark:bg-black dark:text-white  te p-3">
                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-lightdark">
                      <div className="border-b border-stroke py-4 px-2 dark:bg-lightdark dark:bg-black dark:text-white  dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Sub Category Images
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4  dark:bg-black dark:text-white dark:bg-lightdark dark:border-white">
                          {posterimageUrl.map((item: any, index) => {
                            return (
                              <div key={index}>
                                <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                                  <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
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
                                <input
                                  className="primary-input "
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item.altText}
                                  onChange={(e) =>
                                    handlealtTextposterimageUrl(
                                      index,
                                      String(e.target.value),
                                    )
                                  }
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
                      <div className="border-b border-stroke py-4 px-2 dark:bg-lightdark dark:bg-black dark:text-white  dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          Banner Image
                        </h3>
                      </div>
                      {bannerImageUrl && bannerImageUrl.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4  dark:bg-black dark:text-white dark:bg-lightdark dark:border-white">
                          {bannerImageUrl.map((item: any, index) => {
                            return (
                              <div key={index}>
                                <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                                  <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
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
                                <input
                                  className="primary-input "
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item.altText}
                                  onChange={(e) =>
                                    handlealtTextbannerImageUrl(
                                      index,
                                      String(e.target.value),
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <Imageupload setposterimageUrl={setBannerImageUrl} />
                      )}
                    </div>

                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                        <label className=" primary-label">
                          Sub Category Name
                        </label>
                        <input
                          type="text"
                          name="title"
                          onChange={formik.handleChange}
                          value={formik.values.title}
                          placeholder="Title"
                          className={`primary-input ${formik.touched.title && formik.errors.title
                              ? 'border-red-500'
                              : ''
                            }`}
                        />
                        {formik.touched.title && formik.errors.title ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.title}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label className=" primary-label">
                          Category Description
                        </label>
                        <textarea
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          placeholder="Description"
                          className={`primary-input ${formik.touched.title && formik.errors.title
                              ? 'border-red-500'
                              : ''
                            }`}
                        />
                        {formik.touched.title && formik.errors.title ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.title}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className=" primary-label">
                          Category Short Description
                        </label>
                        <textarea
                          name="short_description"
                          onChange={formik.handleChange}
                          value={formik.values.short_description}
                          placeholder="Short Description"
                          className={`primary-input ${formik.touched.short_description &&
                              formik.errors.short_description
                              ? 'border-red-500'
                              : ''
                            }`}
                        />
                        {formik.touched.short_description &&
                          formik.errors.short_description ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.short_description}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label className="mb-3 primary-label">
                          Select Parent Category (atleat one)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categoriesList?.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                className="accent-green-500"
                                name="CategoryId"
                                checked={
                                  formik.values.CategoryId === category.id
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    'CategoryId',
                                    formik.values.CategoryId === category.id
                                      ? null
                                      : category.id,
                                  )
                                }
                              />
                              <label
                                htmlFor={`category-${category.id}`}
                                className="ml-2 text-black dark:text-white"
                              >
                                {category.title}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <div className="w-2/4">
                          <label className="primary-label">
                            Meta Title
                          </label>
                          <input
                            type="text"
                            name="Meta_Title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Meta_Title}
                            placeholder="Meta Title"
                            className={`primary-input ${formik.touched.Meta_Title &&
                                formik.errors.Meta_Title
                                ? 'border-red-500'
                                : ''
                              }`}
                          />
                          {formik.touched.Meta_Title &&
                            formik.errors.Meta_Title ? (
                            <div className="text-red text-sm">
                              {formik.errors.Meta_Title as String}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-2/4">
                          <label className="primary-label">
                            Canonical Tag
                          </label>
                          <input
                            onBlur={formik.handleBlur}
                            type="text"
                            name="Canonical_Tag"
                            onChange={formik.handleChange}
                            value={formik.values.Canonical_Tag}
                            placeholder="Canonical Tag"
                            className={`primary-input ${formik.touched.Canonical_Tag &&
                                formik.errors.Canonical_Tag
                                ? 'border-red-500'
                                : ''
                              }`}
                          />

                          {formik.touched.Canonical_Tag &&
                            formik.errors.Canonical_Tag ? (
                            <div className="text-red text-sm">
                              {formik.errors.Canonical_Tag as String}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="primary-label">
                          Meta Description
                        </label>
                        <textarea
                          name="Meta_description"
                          onChange={formik.handleChange}
                          value={formik.values.Meta_description}
                          placeholder="Meta Description"
                          className={`primary-input ${formik.touched.description &&
                              formik.errors.description
                              ? 'border-red-500'
                              : ''
                            }`}
                        />
                        {formik.touched.Meta_description &&
                          formik.errors.Meta_description ? (
                          <div className="text-red text-sm">
                            {formik.errors.Meta_description as String}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex gap-4 mt-2">
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
                            className={`primary-input ${formik.touched.Images_Alt_Text &&
                                formik.errors.Images_Alt_Text
                                ? 'border-red-500'
                                : ''
                              }`}
                          />
                          {formik.touched.Images_Alt_Text &&
                            formik.errors.Images_Alt_Text ? (
                            <div className="text-red text-sm">
                              {formik.errors.Images_Alt_Text as String}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-4 px-8 py-2 bg-primary text-white rounded"
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
