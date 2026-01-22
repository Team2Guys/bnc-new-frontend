'use client';
import { useEffect, useRef, useState } from 'react';
import Imageupload from 'components/ImageUpload/Imageupload';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { ImageRemoveHandler, updateAltText } from 'utils/helperFunctions';
import axios from 'axios';
import { Formik, Form, FieldArray } from 'formik';

import { categoryInitialValues, categoryValidationSchema } from 'data/data';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import Loader from 'components/Loader/Loader';
import { Category } from 'types/interfaces';
import Cookies from 'js-cookie';
import revalidateTag from 'components/ServerActons/ServerAction';
import TopButton from 'components/Dashboard/Layouts/TopButton';
import Input from 'components/ui/Input';
import ImageTextInput from 'components/Common/regularInputs/ImageTextInput';
import { editCategoryNameType, editCategoryProps } from 'types/category';
import { useConfirmModal } from 'components/ui/useConfirmModal';
import { showAlert } from 'utils/Alert';

const FormLayout = ({
  seteditCategory,
  editCategory,
  setMenuType,
}: editCategoryProps) => {
  const admin_token = Cookies.get('2guysAdminToken');
  const super_admin_token = Cookies.get('superAdminToken');
  const { confirm, modalNode } = useConfirmModal();
  let token = admin_token ? admin_token : super_admin_token;

  let CategoryName =
    editCategory && editCategory.title
      ? { name: editCategory.title, description: editCategory.description }
      : null;
  let CategorImageUrl = editCategory && editCategory.posterImage;
  const [posterimageUrl, setposterimageUrl] = useState<any[] | undefined>(
    CategorImageUrl ? [CategorImageUrl] : undefined,
  );

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
    productCustomUrl: editCategory?.productCustomUrl ?? '',
    categoryCustomUrl: editCategory?.categoryCustomUrl ?? '',
    status: editCategory?.status || 'PUBLISHED',
  });
  const formikValuesRef = useRef<editCategoryNameType | Category>(
    editCategoryName ? editCategoryName : categoryInitialValues,
  );

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
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${
        updateFlag ? addProductUrl : '/api/categories/AddCategory'
      }`;
      console.log(newValue, 'newValue');
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
      showAlert({
        title: updateFlag
          ? 'Category has been successfully updated 🎉'
          : 'Category has been successfully created 🎉',
        icon: 'success',
      });
      updateFlag ? seteditCategory(null) : null;
      setposterimageUrl(undefined);
      setBannerImageUrl(undefined);
      revalidateTag('categories');
      resetForm();
      setMenuType('Categories');
    } catch (err) {
      console.log('error occurred', err);
      setloading(false);
    }
  };

  console.log(setEditCategoryName, 'setEditCategoryName');
  const hasUnsavedChanges = (): boolean => {
    let isPosterChanged: boolean;
    let isBannerChanged: boolean;

    if (editCategory) {
      const oldPoster = editCategory?.posterImage;
      const newPoster = posterimageUrl?.[0];

      isPosterChanged =
        !oldPoster || !newPoster
          ? oldPoster !== newPoster
          : oldPoster.public_id !== newPoster.public_id ||
            (oldPoster.altText ?? '') !== (newPoster.altText ?? '');

      const oldBanner = editCategory?.bannerImage;
      const newBanner = bannerImageUrl?.[0];

      isBannerChanged =
        !oldBanner || !newBanner
          ? oldBanner !== newBanner
          : oldBanner.public_id !== newBanner.public_id ||
            (oldBanner.altText ?? '') !== (newBanner.altText ?? '');
    } else {
      // Adding mode (initially no images)
      isPosterChanged = !!posterimageUrl && posterimageUrl.length > 0;
      isBannerChanged = !!bannerImageUrl && bannerImageUrl.length > 0;
    }

    const isFormChanged =
      JSON.stringify(editCategoryName) !==
      JSON.stringify(formikValuesRef.current);
    return isPosterChanged || isBannerChanged || isFormChanged;
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
          title: 'Unsaved Changes',
          content: 'You have unsaved changes. Do you want to discard them?',
          okText: 'Discard Changes',
          cancelText: 'Cancel',
          onOk: () => setMenuType('Categories'),
        });
      } else {
        setMenuType('All Categories');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [editCategoryName, posterimageUrl]);

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      confirm({
        title: 'Unsaved Changes',
        content: 'You have unsaved changes. Do you want to discard them?',
        okText: 'Discard Changes',
        cancelText: 'Cancel',
        onOk: () => setMenuType('Categories'),
      });
      return;
    }

    setMenuType('Categories');
  };
  return (
    <>
      {modalNode}
      <Formik
        initialValues={
          editCategoryName ? editCategoryName : categoryInitialValues
        }
        validationSchema={categoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          formikValuesRef.current = formik.values;
          return (
            <Form onSubmit={formik.handleSubmit}>
              <TopButton handleBack={handleBack} loading={loading} />

              <div className="flex justify-center ">
                <div className="flex flex-col gap-9 w-full dark:border-strokedark dark:bg-lightdark rounded-md">
                  <div className="rounded-md gap-3 flex justify-evenly dark:bg-lightdark mb-3 mt-3">
                    <div className="upload_image dark:border-strokedark dark:bg-lightdark w-6/12">
                      <div className="inputs_heading border-stroke dark:border-strokedark ">
                        <h3 className="label_main">Add Category Images</h3>
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
                                  onChange={(val) =>
                                    setposterimageUrl((prev) =>
                                      updateAltText(prev, index, val),
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
                      <div className="border p-2">
                        <div className="rounded-sm border border-stroke dark:border-strokedark dark:bg-lightdark ">
                          <div className="inputs_heading border-stroke dark:border-strokedark">
                            <h3 className="label_main">
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
                                      onChange={(val) =>
                                        setBannerImageUrl((prev) =>
                                          updateAltText(prev, index, val),
                                        )
                                      }
                                      className="border rounded p-2 focus:outline-none mt-1"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <Imageupload
                              setposterimageUrl={setBannerImageUrl}
                            />
                          )}
                        </div>
                        <div className=" flex flex-wrap md:flex-nowrap gap-4 mt-3">
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
                        <div className="mt-2">
                          <Input
                            label="Product Page Heading"
                            name="productpageHeading"
                            placeholder="Product Page Heading"
                          />
                        </div>

                        <div className="flex gap-4 mt-2 flex-wrap md:flex-nowrap">
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
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 mt-2 p-2 w-1/2 border">
                      <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                        <div className="inputs_heading border-stroke dark:border-strokedark">
                          <h3 className="label_main">FAQS</h3>
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
                        <div className="inputs_heading border-stroke dark:border-strokedark">
                          <h3 className="label_main">heading checks</h3>
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

              <div className="flex justify-start">
                <button type="submit" className="dashboard_primary_button ">
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
