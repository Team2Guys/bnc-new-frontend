'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import { IREVIEWS } from 'types/general';
const AddReview = dynamic(() => import('./AddReview'));
const ViewReviews = dynamic(() => import('./ViewReviews'));

function MainPage({ reviews }: { reviews: IREVIEWS[] }) {
  const [editReview, setEditsetReview] = useState<IREVIEWS | undefined>();
  const [selecteMenu, setselecteMenu] = useState<string>('All Reviews');

  return (
    <DefaultLayout>
      {selecteMenu == 'All Reviews' ? (
        <ViewReviews
          setEditsetReview={setEditsetReview}
          setselecteMenu={setselecteMenu}
          review={reviews}
        />
      ) : (
        <AddReview
          editReview={editReview}
          setEditsetReview={setEditsetReview}
          setselecteMenu={setselecteMenu}
        />
      )}
    </DefaultLayout>
  );
}

export default MainPage;
