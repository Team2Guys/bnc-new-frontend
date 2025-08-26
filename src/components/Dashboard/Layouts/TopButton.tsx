'use client'

import Loader from 'components/Loader/Loader';
import { Field } from 'formik';
import React, { SetStateAction } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';

interface ITOPBUTTON {
    setMenuType: React.Dispatch<SetStateAction<string>>;
    loading?: Boolean
}


function TopButton({ setMenuType, loading }: ITOPBUTTON) {
    return (
        <div className='flex items-center justify-between'>
            <p
                className="dashboard_primary_button"
                onClick={() => {
                    setMenuType('Categories');
                }}
            >
                <IoMdArrowRoundBack /> Back
            </p>

            <div className='flex gap-2'>
                <Field
                    as="select"
                    name="status"
                    className="border rounded p-2 focus:outline-none"
                >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                </Field>

                <button
                    disabled={loading ? true : false}
                    type="submit"
                    className="dashboard_primary_button"
                >
                    {loading ? <Loader color="#fff" /> : 'Submit'}
                </button>
            </div>

        </div>

    )
}

export default TopButton