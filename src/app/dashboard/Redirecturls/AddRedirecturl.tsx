"use client"
import React, { SetStateAction, useEffect, useState } from 'react'
import { initialRedirectUrls, RedirectUrls } from 'types/general'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { IoMdArrowRoundBack } from 'react-icons/io';
import revalidateTag from 'components/ServerActons/ServerAction';
import showToast from 'components/Toaster/Toaster';
import { createRedirectUrl, updateRedirectUrl } from 'config/fetch';



interface IVIEWREDIRECTURLS {
  setRedirectUrls: React.Dispatch<SetStateAction<RedirectUrls | undefined>>
  setselecteMenu: React.Dispatch<SetStateAction<string>>,
  RedirectUrls: RedirectUrls | undefined
}


function AddRedirecturl({ RedirectUrls, setRedirectUrls, setselecteMenu }: IVIEWREDIRECTURLS) {
  const [loading, setloading] = useState(false)


  const [formDate, setformDate] = useState<initialRedirectUrls>({
    redirectedUrl: RedirectUrls?.redirectedUrl || "",
    url: RedirectUrls?.url || "",

  })

  useEffect(() => {

    setformDate({
    redirectedUrl: RedirectUrls?.redirectedUrl || "",
    url: RedirectUrls?.url || "",

    })
  }, [RedirectUrls])


  const validationSchema = Yup.object({
    url: Yup.string().required('Url is required'),
    redirectedUrl: Yup.string().required('redirectedUrl is required'),
  });

  const apiHandler = async (values: initialRedirectUrls) => {
    try {
      setloading(true)
      if (RedirectUrls?.redirectedUrl) {
        // UPDATE existing review
        await updateRedirectUrl({id:RedirectUrls.id, ...values})

          ;
      } else {
        // ADD new review
        await createRedirectUrl(values);
      }

      setRedirectUrls(undefined);
      setselecteMenu('All RedirectUrls')
      revalidateTag("RedirectUrls")
      // eslint-disable-next-line
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

  return (
    <>
      <Formik enableReinitialize initialValues={formDate}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (


          <Form className="space-y-4 max-w-2xl mx-auto">
            <div className='flex border items-center justify-between'>

              <p
                className="dashboard_primary_button"
                onClick={() => {
                  setselecteMenu('All RedirectUrls');
                }}
              >
                <IoMdArrowRoundBack /> Back
              </p>
              <button type="submit" className="dashboard_primary_button">
                {loading ? "loading..." : 'Submit'}
                </button>
                    </div>

            <div>
              <label htmlFor="name">Url Endpoint </label>
              <Field name="url" type="text" className="primary-input" />
              <ErrorMessage name="url" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="redirectedUrl">Redirect Pages</label>
              <Field name="redirectedUrl" type="text" className="primary-input" />
              <ErrorMessage name="redirectedUrl" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={loading} className="dashboard_primary_button">
              {(loading) ? "Submitting" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </>

  )
}

export default AddRedirecturl


