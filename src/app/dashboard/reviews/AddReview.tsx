'use client';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import Imageupload from 'components/ImageUpload/Imageupload';

import {
  compareImageArray,
  compareImages,
  handleImageAltText,
  ImageRemoveHandler,
  updateAltText,
} from 'utils/helperFunctions';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';

import { IoMdArrowRoundBack } from 'react-icons/io';
import revalidateTag from 'components/ServerActons/ServerAction';
import { ProductImages } from 'types/types';
import { createReview, updateReview } from 'config/fetch';
import { initiValuesProps, IREVIEWS } from 'types/general';
import ImageTextInput from 'components/Common/regularInputs/ImageTextInput';
import Input from 'components/ui/Input';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import { useConfirmModal } from 'components/ui/useConfirmModal';
import { showAlert } from 'utils/Alert';

interface I_Add_Review {
  setEditsetReview: React.Dispatch<SetStateAction<IREVIEWS | undefined>>;
  setselecteMenu: React.Dispatch<SetStateAction<string>>;
  editReview: IREVIEWS | undefined;
}

function AddReview({
  editReview,
  setEditsetReview,
  setselecteMenu,
}: I_Add_Review) {
  const [loading, setloading] = useState(false);

  const [posterimageUrl, setposterimageUrl] = useState<
    ProductImages[] | undefined
  >(
    editReview && editReview.posterImageUrl
      ? [editReview.posterImageUrl]
      : undefined,
  );
  const [imagesUrl, setImagesUrl] = useState<ProductImages[]>(
    editReview && editReview.posterImageUrl ? editReview.ReviewsImages : [],
  );
  const dragImage = useRef<number | null>(null);
  const draggedOverImage = useRef<number | null>(null);

  const [formDate] = useState<initiValuesProps>({
    name: editReview?.name ? editReview?.name : '',
    starRating: editReview?.starRating ? editReview?.starRating : 0,
    ReviewsDescription: editReview?.ReviewsDescription
      ? editReview?.ReviewsDescription
      : '',
    reviewDate: editReview?.reviewDate ? editReview?.reviewDate : undefined,
  });
  const { confirm, modalNode } = useConfirmModal();
  const formikValuesRef = useRef(formDate);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    ReviewsDescription: Yup.string().required('Description is required'),
    starRating: Yup.number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5')
      .nullable(),
    posterImageUrl: Yup.string().nullable(),
  });

  const apiHandler = async (values: initiValuesProps) => {
    try {
      setloading(true);
      const posterImageUrl = posterimageUrl && posterimageUrl[0];

      const payload = {
        ...values,
        posterImageUrl: posterImageUrl !== undefined ? posterImageUrl : null,
        ReviewsImages: imagesUrl,
      };

      if (editReview?.name) {
        await updateReview({ id: editReview.id, ...payload });
      } else {
        await createReview(payload);
      }

      setEditsetReview(undefined);
      setselecteMenu('All Reviews');
      revalidateTag('reviews');
    } catch (error: any) {
      //eslint-disable-next-line
      const graphQLError = error?.graphQLErrors?.[0]?.message;
      showAlert({
        title: graphQLError || 'Internal server error',
        icon: 'error',
      });
    } finally {
      setloading(false);
    }
  };

  const handleSubmit = async (
    values: initiValuesProps,
    { resetForm }: FormikHelpers<initiValuesProps>,
  ) => {
    await apiHandler(values);
    resetForm();
  };

  function handleSort() {
    if (dragImage.current === null || draggedOverImage.current === null) return;

    const imagesClone = imagesUrl && imagesUrl.length > 0 ? [...imagesUrl] : [];

    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;

    setImagesUrl(imagesClone);
  }

  const hasUnsavedChanges = (): boolean => {
    if (!editReview) return false;
    const oldPoster = editReview.posterImageUrl;
    const newPoster = posterimageUrl ? posterimageUrl?.[0] : null;
    const isPosterChanged = compareImages(oldPoster, newPoster);
    const isImagesUrlChanged = compareImageArray(
      editReview.ReviewsImages ?? [],
      imagesUrl,
    );

    console.log(editReview, posterimageUrl, 'formDate');
    const isFormChanged =
      JSON.stringify(formDate) !== JSON.stringify(formikValuesRef.current);
    return isPosterChanged || isImagesUrlChanged || isFormChanged;
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
          onOk: () => {
            setselecteMenu('All Reviews');
          },
        });
      } else {
        setselecteMenu('All Reviews');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [formDate, posterimageUrl]);

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      confirm({
        title: 'Unsaved Changes',
        content: 'You have unsaved changes. Do you want to discard them?',
        okText: 'Discard Changes',
        cancelText: 'Cancel',
        onOk: () => setselecteMenu('All Reviews'),
      });
      return;
    }

    setselecteMenu('All Reviews');
  };

  return (
    <>
      {modalNode}
      <Breadcrumb pageName={'Add Reviews'} />
      <div className="back_main_button border-b">
        <p className="dashboard_primary_button" onClick={handleBack}>
          <IoMdArrowRoundBack /> Back
        </p>
        <div className="w-full bg-white dark:bg-black p-3 flex justify-end ">
          <button type="submit" className="dashboard_primary_button">
            {loading ? 'Submitting' : 'Submit'}
          </button>
        </div>
      </div>
      <div className="relative">
        <Formik
          enableReinitialize
          initialValues={formDate}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            formikValuesRef.current = formik.values;
            return (
              <Form className="space-y-6 max-w-5xl mx-auto shadow-lg rounded-xl p-8 bg-white dark:bg-gray-900">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Reviewer Image */}
                    <div className="rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold  dark:text-white">
                          Reviewer Image
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
                          {posterimageUrl.map(
                            (item: ProductImages, index: number) => (
                              <div
                                className="relative group rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-700 transform transition-transform duration-300 hover:scale-105"
                                key={index}
                              >
                                <button
                                  type="button"
                                  className="absolute top-2 right-2 invisible group-hover:visible bg-white rounded-full p-1 shadow"
                                  onClick={() =>
                                    ImageRemoveHandler(
                                      item.public_id || '',
                                      setposterimageUrl,
                                    )
                                  }
                                >
                                  <RxCross2
                                    className="text-red-500 hover:text-red-700"
                                    size={18}
                                  />
                                </button>

                                <Image
                                  className="object-cover w-full h-40"
                                  width={300}
                                  height={200}
                                  src={item.imageUrl}
                                  alt={`productImage-${index}`}
                                />

                                <ImageTextInput
                                  name="altText"
                                  value={item.altText || ''}
                                  placeholder="Alt text"
                                  onChange={(val) =>
                                    handleImageAltText(
                                      index,
                                      val,
                                      setposterimageUrl,
                                      'altText',
                                    )
                                  }
                                />
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <div className="p-5">
                          <Imageupload setposterimageUrl={setposterimageUrl} />
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium  dark:text-white mb-2">
                        Reviewer Name
                      </label>
                      <Input name="name" placeholder="Enter reviewer name" />
                    </div>

                    {/* Star Rating */}
                    <div>
                      <label className="block text-sm font-medium  dark:text-white mb-2">
                        Star Rating
                      </label>
                      <Field
                        name="starRating"
                        type="number"
                        className="primary-input"
                      />
                      <ErrorMessage
                        name="starRating"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium  dark:text-white mb-2">
                        Review Description
                      </label>
                      <Field
                        name="ReviewsDescription"
                        as="textarea"
                        rows={5}
                        className="primary-input"
                        placeholder="Write review details..."
                      />
                      <ErrorMessage
                        name="ReviewsDescription"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    {/* Review Date */}
                    <div>
                      <label className="block text-sm font-medium  dark:text-white mb-2">
                        Review Date
                      </label>
                      <Field
                        name="reviewDate"
                        type="date"
                        className="primary-input w-fit"
                      />
                      <ErrorMessage
                        name="reviewDate"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    {/* Review Images */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                      <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold  dark:text-white">
                          Add Review Images
                        </h3>
                      </div>
                      <div className="p-5">
                        <Imageupload setImagesUrl={setImagesUrl} multiple />
                      </div>

                      {imagesUrl && imagesUrl.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
                          {imagesUrl.map((item: any, index: number) => (
                            <div
                              key={index}
                              draggable
                              onDragStart={() => (dragImage.current = index)}
                              onDragEnter={() =>
                                (draggedOverImage.current = index)
                              }
                              onDragEnd={handleSort}
                              onDragOver={(e) => e.preventDefault()}
                              className="space-y-2"
                            >
                              <div className="relative group rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
                                <button
                                  type="button"
                                  className="absolute top-2 right-2 invisible group-hover:visible bg-white rounded-full p-1 shadow z-10"
                                  onClick={() =>
                                    ImageRemoveHandler(
                                      item.public_id,
                                      setImagesUrl,
                                    )
                                  }
                                >
                                  <RxCross2
                                    className="text-red-500 hover:text-red-700"
                                    size={18}
                                  />
                                </button>
                                <div className="h-[120px] w-full overflow-hidden">
                                  <Image
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={200}
                                    src={item.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>
                              </div>
                              <ImageTextInput
                                name="altText"
                                value={item.altText || ''}
                                placeholder="Alt text"
                                onChange={(val) =>
                                  setImagesUrl((prev) =>
                                    updateAltText(prev, index, val),
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex justify-start">
                  <button type="submit" className="dashboard_primary_button">
                    {loading ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default AddReview;
