'use client';
import { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { ISUBCATEGORY } from 'types/types';
import showToast from 'components/Toaster/Toaster';
import Imageupload from 'components/ImageUpload/Imageupload';
import {
  subcategoryValidationSchema,
  subcategoryInitialValues,
} from 'data/data';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import Loader from 'components/Loader/Loader';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import Cookies from 'js-cookie';
import revalidateTag from 'components/ServerActons/ServerAction';
import TopButton from 'components/Dashboard/Layouts/TopButton';
import Checkbox from 'components/ui/Checkbox';
import Input from 'components/ui/Input';
import ImageTextInput from 'components/Common/regularInputs/ImageTextInput';
import { editCategoryProps, editSubCategoryNameType } from 'types/category';
import { useConfirmModal } from 'components/ui/useConfirmModal';


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
        customUrl: editCategory?.customUrl,
      }
      : null;
  let CategorImageUrl = editCategory && editCategory.posterImage;
  const [posterimageUrl, setposterimageUrl] = useState<any[] | undefined>(CategorImageUrl ? [CategorImageUrl] : undefined);
  const [bannerImageUrl, setBannerImageUrl] = useState<any[] | undefined>(editCategory && editCategory.bannerImage && [editCategory.bannerImage],
  );
  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<editSubCategoryNameType | ISUBCATEGORY | undefined>(CategoryName ? CategoryName : subcategoryInitialValues);
  const { confirm, modalNode } = useConfirmModal();
  const formikValuesRef = useRef<editSubCategoryNameType | ISUBCATEGORY>(editCategoryName ? editCategoryName : subcategoryInitialValues);
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
        setEditCategoryName(undefined);
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
      const newBanner = bannerImageUrl ? bannerImageUrl?.[0] : null;
      console.log(newBanner)
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

    const isFormChanged = JSON.stringify(editCategoryName) !== JSON.stringify(formikValuesRef.current);
    console.log(editCategory.bannerImage, 'formikValuesRef.current', bannerImageUrl, isBannerChanged)
    return (isPosterChanged || isBannerChanged || isFormChanged)
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
          onOk: () => setMenuType("Categories"),
        });
      } else { setMenuType("All Categories"); }
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
        title: "Unsaved Changes",
        content: "You have unsaved changes. Do you want to discard them?",
        okText: "Discard Changes",
        cancelText: "Cancel",
        onOk: () => setMenuType("Categories"),
      });
      return;
    }

    setMenuType("Categories");
  };

  return (
    <>
      {modalNode}
      <Formik
        initialValues={
          editCategoryName ? editCategoryName : subcategoryInitialValues
        }
        validationSchema={subcategoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          formikValuesRef.current = formik.values;
          return (
            <Form onSubmit={formik.handleSubmit}>
              <TopButton handleBack={handleBack} loading={loading} />
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
                                <ImageTextInput
                                  name="altText"
                                  value={item.altText}
                                  placeholder="Alt text"
                                  onChange={(val) => handlealtTextposterimageUrl(index, val)}
                                  className='border rounded p-2 focus:outline-none mt-1'
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

                    <div className="flex flex-col gap-5 mt-2">
                      <Input
                        label="Sub Category Name"
                        name="title"
                        placeholder="Sub Category Name"
                      />
                      <Input
                        label="Category Description"
                        name="description"
                        placeholder="Description"
                      />
                      <Input
                        label="Custom Url"
                        name="customUrl"
                        placeholder="Custom Url"
                      />
                      <Input
                        label="Category Short Description"
                        name="short_description"
                        placeholder="Short Description"
                        textarea
                      />

                      <div>
                        <label className="mb-3 primary-label">
                          Select Parent Category (atleat one)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categoriesList?.map((category, index) => (
                            <Checkbox
                              key={index}
                              id={`category-${category.id}`}
                              name="CategoryId"
                              checked={formik.values.CategoryId === category.id}
                              label={category.title}
                              onChange={() =>
                                formik.setFieldValue(
                                  "CategoryId",
                                  formik.values.CategoryId === category.id ? null : category.id
                                )
                              }
                            />
                          ))}
                        </div>
                      </div>

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
