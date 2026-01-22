'use client';

import Loader from 'components/Loader/Loader';
import { Field } from 'formik';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface ITOPBUTTON {
  loading?: Boolean;
  handleBack: any;
}

function TopButton({ loading, handleBack }: ITOPBUTTON) {
  return (
    <div className="back_main_button">
      <p className="dashboard_primary_button" onClick={handleBack}>
        <IoMdArrowRoundBack /> Back
      </p>

      <div className="flex gap-2">
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
  );
}

export default TopButton;
