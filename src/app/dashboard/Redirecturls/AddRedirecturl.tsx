"use client"
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { initialRedirectUrls, RedirectUrls } from 'types/general'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { IoMdArrowRoundBack } from 'react-icons/io';
import revalidateTag from 'components/ServerActons/ServerAction';
import showToast from 'components/Toaster/Toaster';
import { createRedirectUrl, updateRedirectUrl } from 'config/fetch';
import { useConfirmModal } from 'components/ui/useConfirmModal';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';

interface IVIEWREDIRECTURLS {
  setRedirectUrls: React.Dispatch<SetStateAction<RedirectUrls | undefined>>
  setselecteMenu: React.Dispatch<SetStateAction<string>>,
  RedirectUrls: RedirectUrls | undefined
}

function AddRedirecturl({ RedirectUrls, setRedirectUrls, setselecteMenu }: IVIEWREDIRECTURLS) {
  const [loading, setloading] = useState(false)

  const [formDate] = useState<initialRedirectUrls>({
    redirectedUrl: RedirectUrls?.redirectedUrl || "",
    url: RedirectUrls?.url || "",
  })
  const formikValuesRef = useRef<initialRedirectUrls>(formDate);
  const { confirm, modalNode } = useConfirmModal();


  const validationSchema = Yup.object({
    url: Yup.string().required('Url is required'),
    redirectedUrl: Yup.string().required('Redirected URL is required'),
  });

  const apiHandler = async (values: initialRedirectUrls) => {
    try {
      setloading(true)
      if (RedirectUrls?.redirectedUrl) {
        // UPDATE existing review
        await updateRedirectUrl({ id: RedirectUrls.id, ...values })

          ;
      } else {
        await createRedirectUrl(values);
      }

      setRedirectUrls(undefined);
      setselecteMenu('All RedirectUrls')
      revalidateTag("RedirectUrls")
    } catch (error: any) {
      const graphQLError = error?.graphQLErrors?.[0]?.message;
      showToast('error', graphQLError || "Internal server error")
    } finally {
      setloading(false)
    }
  };

  const handleSubmit = async (values: initialRedirectUrls, { resetForm }: FormikHelpers<initialRedirectUrls>) => {
    await apiHandler(values)
    resetForm()
  };


  const hasUnsavedChanges = (): boolean => {
    const isFormChanged = JSON.stringify(formDate) !== JSON.stringify(formikValuesRef.current);

    return isFormChanged;
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
            setselecteMenu("All RedirectUrls");
          },
        });
      } else { setselecteMenu("All RedirectUrls"); }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [formDate]);

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      confirm({
        title: 'Unsaved Changes',
        content: 'You have unsaved changes. Do you want to discard them?',
        okText: 'Discard Changes',
        cancelText: 'Cancel',
        onOk: () => {
          setselecteMenu("All RedirectUrls");
        },
      });
      return;
    }

    setselecteMenu("All RedirectUrls");
  };

  return (
    <div>
      {modalNode}
      <div className="p-6">
        {/* Breadcrumb */}

        <Breadcrumb pageName={"Add Redirect URL"} />

        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <Formik enableReinitialize initialValues={formDate}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => {
              formikValuesRef.current = values;
              return (
                <Form className="space-y-6">
                  {/* Top Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 transition"
                      onClick={handleBack}
                    >
                      <IoMdArrowRoundBack /> Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
                    >
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Url Endpoint
                    </label>
                    <Field
                      name="url"
                      type="text"
                      placeholder="/example-endpoint"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-gray-900 dark:text-white outline-none transition focus:border-secondary dark:focus:border-secondary focus:ring-2 focus:ring-secondary dark:focus:secondary" />
                    <ErrorMessage name="url" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Redirected URL Input */}
                  <div>
                    <label htmlFor="redirectedUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Redirect Pages
                    </label>
                    <Field
                      name="redirectedUrl"
                      type="text"
                      placeholder="https://example.com"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-gray-900 dark:text-white outline-none transition focus:border-secondary dark:focus:border-secondary focus:ring-2 focus:ring-secondary dark:focus:secondary"
                    />
                    <ErrorMessage name="redirectedUrl" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Bottom Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddRedirecturl
