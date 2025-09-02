"use client"
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import Imageupload from 'components/ImageUpload/Imageupload';

import { compareImageArray, compareImages, handleImageAltText, ImageRemoveHandler } from 'utils/helperFunctions';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';

import { IoMdArrowRoundBack } from 'react-icons/io';
import revalidateTag from 'components/ServerActons/ServerAction';
import showToast from 'components/Toaster/Toaster';
import { ProductImages } from 'types/types';
import { createReview, updateReview } from 'config/fetch';
import { initiValuesProps, IREVIEWS, } from 'types/general';
import ImageTextInput from 'components/Common/regularInputs/ImageTextInput';
import Input from 'components/ui/Input';
import { useConfirmModal } from 'components/ui/useConfirmModal';



interface I_Add_Review {
  setEditsetReview: React.Dispatch<SetStateAction<IREVIEWS | undefined>>
  setselecteMenu: React.Dispatch<SetStateAction<string>>,
  editReview: IREVIEWS | undefined
}


function AddReview({ editReview, setEditsetReview, setselecteMenu }: I_Add_Review) {
  const [loading, setloading] = useState(false)

  const [posterimageUrl, setposterimageUrl] = useState<ProductImages[] | undefined>((editReview && editReview.posterImageUrl) ? [editReview.posterImageUrl] : undefined);
  const [imagesUrl, setImagesUrl] = useState<ProductImages[]>((editReview && editReview.posterImageUrl) ? editReview.ReviewsImages : []);
  const dragImage = useRef<number | null>(null);
  const draggedOverImage = useRef<number | null>(null);

  const [formDate] = useState<initiValuesProps>({
    name: editReview?.name ? editReview?.name : '',
    starRating: editReview?.starRating ? editReview?.starRating : 0,
    ReviewsDescription: editReview?.ReviewsDescription ? editReview?.ReviewsDescription : '',
    reviewDate: editReview?.reviewDate ? editReview?.reviewDate : undefined,
  })
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
      setloading(true)
      const posterImageUrl = posterimageUrl && posterimageUrl[0];

      const payload = {
        ...values,
        posterImageUrl: posterImageUrl !== undefined ? posterImageUrl : null,
        ReviewsImages: imagesUrl
      };

      if (editReview?.name) {
        await updateReview({ id: editReview.id, ...payload });

      } else {
        await createReview(payload);

      }

      setEditsetReview(undefined);
      setselecteMenu('All Reviews')
      revalidateTag("reviews")
    } //eslint-disable-next-line
    catch (error: any) {
      const graphQLError = error?.graphQLErrors?.[0]?.message;
      showToast('error', graphQLError || "Internal server error")
    } finally {
      setloading(false)
    }
  };



  const handleSubmit = async (values: initiValuesProps, { resetForm }: FormikHelpers<initiValuesProps>) => {


    await apiHandler(values)
    resetForm()

  };

  function handleSort() {
    if (dragImage.current === null || draggedOverImage.current === null) return;

    const imagesClone = imagesUrl && imagesUrl.length > 0 ? [...imagesUrl] : [];

    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;

    setImagesUrl(imagesClone);
  }

  const handlealtText = (index: number, newaltText: string) => {
    const updatedImagesUrl = imagesUrl.map((item, i) =>
      i === index ? { ...item, altText: newaltText } : item,
    );
    setImagesUrl(updatedImagesUrl);
  };

  const hasUnsavedChanges = (): boolean => {
    if (!editReview) return false;
    const oldPoster = editReview.posterImageUrl;
    const newPoster = posterimageUrl ? posterimageUrl?.[0] : null;
    const isPosterChanged = compareImages(oldPoster, newPoster);
    const isImagesUrlChanged = compareImageArray(editReview.ReviewsImages ?? [], imagesUrl);


    console.log(editReview, posterimageUrl, 'formDate')
    const isFormChanged = JSON.stringify(formDate) !== JSON.stringify(formikValuesRef.current);
    return (isPosterChanged || isImagesUrlChanged || isFormChanged)
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
          onOk: () => { setselecteMenu('All Reviews'); },
        });
      } else { setselecteMenu('All Reviews'); }
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
        title: "Unsaved Changes",
        content: "You have unsaved changes. Do you want to discard them?",
        okText: "Discard Changes",
        cancelText: "Cancel",
        onOk: () => setselecteMenu('All Reviews')
      });
      return;
    }

    setselecteMenu('All Reviews');
  };

  return (
    <>
      {modalNode}
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-parimary bg-black rounded-sm w-fit p-2 cursor-pointer text-white"
        onClick={handleBack}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik enableReinitialize initialValues={formDate} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {(formik) => {
          formikValuesRef.current = formik.values;
          return (
            <Form className="space-y-4 max-w-2xl mx-auto">

              <div className="rounded-sm border  bg-white dark:bg-primary border-stroke">
                <div className="border-b bg-white dark:bg-primary py-4 px-2 ">
                  <h3 className="font-medium  text-black dark:text-white">
                    Reviewer Image
                  </h3>
                </div>
                {posterimageUrl && posterimageUrl.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4  dark:border-white dark:bg-black">
                    {posterimageUrl.map((item: ProductImages, index: number) => {

                      return (
                        <div
                          className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                          key={index}
                        >
                          <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                            <RxCross2
                              className="cursor-pointer text-red-500 dark:text-red-700"
                              size={17}
                              onClick={() => {
                                ImageRemoveHandler(
                                  item.public_id || "",
                                  setposterimageUrl,

                                );
                              }}
                            />
                          </div>

                          <Image
                            key={index}
                            className="object-cover w-full h-full dark:bg-black dark:shadow-lg cursor-crosshair"
                            width={300}
                            height={200}
                            src={item.imageUrl}
                            loading='lazy'
                            alt={`productImage-${index}`}
                          />

                          <ImageTextInput
                            name="altText"
                            value={item.altText || ""}
                            placeholder="altText"
                            onChange={(val) =>
                              handleImageAltText(index, val, setposterimageUrl, "altText")
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
              <div>
                <Input
                  label="Name"
                  name="name"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className='primary-label' htmlFor="starRating">Star Rating</label>
                <Field name="starRating" type="number" className="primary-input" />
                <ErrorMessage name="starRating" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className='primary-label' htmlFor="ReviewsDescription">Description</label>
                <Field name="ReviewsDescription" as="textarea" rows={4} className="primary-input" />
                <ErrorMessage name="ReviewsDescription" component="div" className="text-red-500 text-sm" />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='primary-label' htmlFor="reviewDate">Review Date</label>
                <Field name="reviewDate" type="date" className="primary-input w-fit items-center" />
                <ErrorMessage name="reviewDate" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-lightdark">
                <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add Reviews Images
                  </h3>
                </div>
                <Imageupload setImagesUrl={setImagesUrl} multiple />
                {imagesUrl && imagesUrl.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {imagesUrl.map((item: any, index) => {
                      return (
                        <div key={index}
                          draggable
                          onDragStart={() => (dragImage.current = index)}
                          onDragEnter={() =>
                            (draggedOverImage.current = index)
                          }
                          onDragEnd={handleSort}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                            <div className="absolute top-1 right-1 invisible group-hover:visible errorColor bg-white rounded-full z-10" draggable>
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
                            value={item.altText || ""}
                            placeholder="altText"
                            onChange={(val) =>
                              handlealtText(index, val)
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <button type="submit" className="dashboard_primary_button">
                {loading ? "Submitting" : "Submit"}
              </button>
            </Form>
          )
        }}
      </Formik>
    </>

  )
}

export default AddReview


