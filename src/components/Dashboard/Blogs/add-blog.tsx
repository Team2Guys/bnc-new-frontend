'use client';
import { Form, Formik } from 'formik';
import React, { useState, SetStateAction, Fragment, useRef, useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICategory } from 'types/types';
import { fetchCategories } from 'config/fetch';
import Imageupload from 'components/ImageUpload/Imageupload';
import axios from 'axios';
import showToast from 'components/Toaster/Toaster';
import Loader from 'components/Loader/Loader';
import { Button } from 'components/ui/button';
import { UpdateBlog as IUpdateBlog, UpdateBlog } from 'types/interfaces';
import { RxCross2 } from 'react-icons/rx';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import Image from 'next/image';
import MyEditor from './custom-editor';
import Cookies from 'js-cookie';
import revalidateTag from 'components/ServerActons/ServerAction';
import Select from 'components/ui/Select';
import { useConfirmModal } from 'components/ui/useConfirmModal';

interface IAddBlogs {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  EditInitialValues?: IUpdateBlog;
  setEditBlog: React.Dispatch<SetStateAction<UpdateBlog | null>>;
}

const AddBlogs = ({
  setMenuType,
  EditInitialValues,
  setEditBlog,
}: IAddBlogs) => {
  const [posterimageUrl, setposterimageUrl] = useState<any[] | undefined>(
    EditInitialValues ? [EditInitialValues.posterImage] : [],
  );
  const [isPublish, setIsPublish] = useState(false);
  // eslint-disable-next-line no-undef
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  let finalToken = token ? token : superAdminToken;
  const headers = {
    authorization: `Bearer ${finalToken}`,
  };

  const blogInitialValues = {
    title: EditInitialValues?.title || '',
    category: EditInitialValues?.category || '',
    content: EditInitialValues?.content || '',
    Images_Alt_Text: EditInitialValues?.Images_Alt_Text || '',
    Canonical_Tag: EditInitialValues?.Canonical_Tag || '',
    Meta_Title: EditInitialValues?.Meta_Title || '',
    Meta_description: EditInitialValues?.Meta_description || '',
    redirectionUrl: EditInitialValues?.redirectionUrl || '',
  };
  const { confirm, modalNode } = useConfirmModal();
  const formikValuesRef = useRef(blogInitialValues);

  const {
    data: categories,
    error: categoryError,
    isLoading: categoryLoading,
  } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const addBlogMutation = useMutation({
    mutationFn: (formData: typeof blogInitialValues) => {
      let posterImage = posterimageUrl && posterimageUrl[0];
      if (!posterImage) {
        if (isPublish) {
          showToast('error', 'Please select Thumbnail image😴');
          throw new Error('No poster image selected');
        } else {
          setposterimageUrl([]);
        }
      }

      const values = { ...formData, posterImage };
      if (EditInitialValues) {
        const updatedAt = new Date();
        const finalValues = { updatedAt, isPublished: isPublish, ...values };

        return axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/update/${EditInitialValues.id}`,
          finalValues,
          { headers },
        );
      }

      return axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/create_blog`,
        values,
        { headers },
      );
    },

    onSuccess: () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      if (isPublish) {
        setMenuType('Blogs');
        revalidateTag('blogs');

        showToast(
          'success',
          EditInitialValues
            ? 'Blog updated successfully🎉'
            : 'Blog added successfully🎉',
        );
        setEditBlog(null);
      } else {
        showToast('warn', 'Blog saved as Draft🎉');
      }
    },
    onError: (error: any) => {
      showToast('error', error.data.message + '☹');
      console.error('Error adding blog:', error);
    },
  });

  const handleDebouncedMutation = (newValues: typeof blogInitialValues) => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      addBlogMutation.mutate(newValues);
    }, 5000);
  };

  const hasUnsavedChanges = (): boolean => {

    let isPosterChanged: boolean;

    if (EditInitialValues) {
      const oldPoster = EditInitialValues?.posterImage;
      const newPoster = posterimageUrl?.[0];

      isPosterChanged =
        !oldPoster || !newPoster
          ? oldPoster !== newPoster
          : oldPoster.public_id !== newPoster.public_id ||
          (oldPoster.altText ?? '') !== (newPoster.altText ?? '');

    } else {
      // Adding mode (initially no images)
      isPosterChanged = !!posterimageUrl && posterimageUrl.length > 0;
    }

    const isFormChanged = JSON.stringify(blogInitialValues) !== JSON.stringify(formikValuesRef.current);
    return (isPosterChanged || isFormChanged)
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
          onOk: () => { setMenuType("Blogs"), setEditBlog(null) },
        });
      } else { setMenuType("All Blogs"); setEditBlog(null) }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [blogInitialValues, posterimageUrl]);

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      confirm({
        title: "Unsaved Changes",
        content: "You have unsaved changes. Do you want to discard them?",
        okText: "Discard Changes",
        cancelText: "Cancel",
        onOk: () => { setMenuType("Blogs"), setEditBlog(null) },
      });
      return;
    }
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    setMenuType('Blogs');
    setEditBlog(null);
  };

  const handleCancel = () => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    setMenuType('Blogs');
    setEditBlog(null);
  }


  return (
    <>
      {modalNode}
      {/* Fixed Top Action Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm py-4 px-6 mb-6">
        <div className="flex items-center justify-between">
          <p
            className="dashboard_primary_button"
            onClick={handleBack}
          >
            <IoMdArrowRoundBack /> Back
          </p>

          <div className="flex items-center space-x-3">
            <Button
              disabled={addBlogMutation.isPending}
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              disabled={addBlogMutation.isPending}
              type="submit"
              form="blog-form"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              onClick={() => setIsPublish(false)}
            >
              {addBlogMutation.isPending && !isPublish ? (
                <Loader color="#fff" />
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
              )}
              Save Draft
            </Button>

            <Button
              disabled={addBlogMutation.isPending}
              type="submit"
              form="blog-form"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              onClick={() => setIsPublish(true)}
            >
              {addBlogMutation.isPending && isPublish ? (
                <Loader color="#fff" />
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              )}
              Publish
            </Button>
          </div>
        </div>
      </div>

      {categoryLoading ? (
        <div className="animate-pulse space-y-5 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">
          <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      ) : (
        <Formik
          initialValues={blogInitialValues}
          onSubmit={(values, { resetForm }) => {
            if (isPublish) {
              if (
                values.content === '' ||
                values.category === '' ||
                values.title === ''
              ) {
                return showToast(
                  'error',
                  'Ensure all fields are filled out 😴',
                );
              }
            }

            addBlogMutation.mutate(values, {
              onSuccess: () => {
                if (isPublish) {
                  resetForm();
                }
              },
            });

            revalidateTag('blogs');
          }}
        >
          {({ setFieldValue, values }) => {
            formikValuesRef.current = values;
            return (
              <Form id="blog-form" className="space-y-6 pb-24">
                {/* Main Content & SEO Sidebar - Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content Column (2/3 width) */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Thumbnail Upload Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <span className="w-2 h-5 bg-secondary rounded-full mr-2"></span>
                        Thumbnail Image
                      </h3>

                      {posterimageUrl && posterimageUrl?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                          {posterimageUrl.map((item: any, index) => (
                            <div
                              className="relative group rounded-lg overflow-hidden shadow-md bg-white dark:bg-lightdark transform transition-transform duration-300 hover:scale-105 w-[100px]"
                              key={index}
                            >
                              <div className="absolute top-1 right-1 invisible group-hover:visible text-red-600 bg-white dark:bg-lightdark rounded-full">
                                <RxCross2
                                  className="cursor-pointer text-red-600-500 hover:text-red-600-700"
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
                                className="object-cover w-[100px]"
                                width={120}
                                height={120}
                                src={item?.imageUrl}
                                alt={`productImage-${index}`}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Imageupload setposterimageUrl={setposterimageUrl} />
                      )}
                    </div>

                    <div>
                      <label className=" block text-16 font-medium text-black dark:text-white">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={values.title}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent placeholder:text-lightgrey px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => {
                          setFieldValue('title', e.target.value);
                          handleDebouncedMutation({
                            ...values,
                            title: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className=" block text-16 font-medium text-black dark:text-white">
                        Blog Url
                      </label>
                      <input
                        type="text"
                        name="redirectionUrl"
                        placeholder="Blog Url"
                        value={values.redirectionUrl}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent placeholder:text-lightgrey px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => {
                          setFieldValue('redirectionUrl', e.target.value);
                          handleDebouncedMutation({
                            ...values,
                            redirectionUrl: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label className=" block text-16 font-medium text-black dark:text-white">
                        Category
                      </label>
                      {categoryLoading ? (
                        <Loader color="#fff" />
                      ) : (
                        <Select
                          name="category"
                          className="w-full mt-1 detail-option border rounded-md"
                          defaultValue={values.category || ""}
                          onChange={(value) => {
                            setFieldValue("category", value);
                            handleDebouncedMutation({ ...values, category: value });
                          }}
                          options={[
                            ...(categories?.length
                              ? [
                                { value: "", label: "Select Category", disabled: true },
                                ...categories
                                  .filter((category) => category.title !== "Commercial")
                                  .map((category) => ({
                                    value: category.title,
                                    label: category.title,
                                  })),
                              ]
                              : [{ value: "", label: categoryError ? "Error loading categories" : "No categories found" }]),
                          ]}
                        />
                      )}
                      {categoryError && (
                        <div className="text-red-500">{categoryError.message}</div>
                      )}
                    </div>
                    <MyEditor
                      setFieldValue={setFieldValue}
                      values={values}
                      addBlogMutation={addBlogMutation}
                      handleDebouncedMutation={handleDebouncedMutation}
                    />

                    <div>
                      <label className=" block text-16 font-medium text-black dark:text-white">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="Meta_Title"
                        placeholder="Enter Meta Title"
                        value={values.Meta_Title}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent placeholder:text-lightgrey px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => {
                          setFieldValue('Meta_Title', e.target.value);
                          handleDebouncedMutation({
                            ...values,
                            Meta_Title: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className=" block text-16 font-medium text-black dark:text-white">
                        Canonical Tag
                      </label>
                      <input
                        type="text"
                        name="Canonical_Tag"
                        placeholder="Enter Canonical Tag"
                        value={values.Canonical_Tag}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent placeholder:text-lightgrey px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => {
                          setFieldValue('Canonical_Tag', e.target.value);
                          handleDebouncedMutation({
                            ...values,
                            Canonical_Tag: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className=" block text-16 font-medium text-black dark:text-white">
                        Meta Description
                      </label>
                      <textarea
                        name="Meta_description"
                        placeholder="Enter Meta Description"
                        value={values.Meta_description}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent placeholder:text-lightgrey px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => {
                          setFieldValue('Meta_description', e.target.value);
                          handleDebouncedMutation({
                            ...values,
                            Meta_description: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className=" block text-16 font-medium text-black dark:text-white">
                        Image ALT text
                      </label>
                      <input
                        type="text"
                        name="Images_Alt_Text"
                        placeholder="Enter Image ALT text"
                        value={values.Images_Alt_Text}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent placeholder:text-lightgrey px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => {
                          setFieldValue('Images_Alt_Text', e.target.value);
                          handleDebouncedMutation({
                            ...values,
                            Images_Alt_Text: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button
                        disabled={addBlogMutation.isPending ? true : false}
                        type="submit"
                        className="text-white bg-yellow-500  px-4 py-2 font-semibold rounded-md"
                      >
                        {addBlogMutation.isPending && !isPublish ? (
                          <Loader color="#fff" />
                        ) : (
                          'Draft'
                        )}
                      </Button>
                      <Button
                        disabled={addBlogMutation.isPending ? true : false}
                        type="submit"
                        className="text-white bg-green-600 px-4 py-2 font-semibold rounded-md"
                        onClick={() => setIsPublish(true)}
                      >
                        {addBlogMutation.isPending && isPublish ? (
                          <Loader color="#fff" />
                        ) : (
                          'PUBLISH'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      )}
    </>
  );
};

export default AddBlogs;