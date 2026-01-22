'use client';
import React, { useState } from 'react';
import { RedirectUrls } from 'types/general';
import dynamic from 'next/dynamic';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
const AddRedirecturl = dynamic(() => import('./AddRedirecturl'));
const ViewRedirecturl = dynamic(() => import('./ViewRedirecturl'));

function MainPage({ Redirecturls }: { Redirecturls: RedirectUrls[] }) {
  const [RedirectUrls, setRedirectUrls] = useState<RedirectUrls | undefined>();
  const [selecteMenu, setselecteMenu] = useState<string>('All RedirectUrls');
  return (
    <DefaultLayout>
      {selecteMenu == 'All RedirectUrls' ? (
        <ViewRedirecturl
          Redirecturls={Redirecturls}
          setRedirectUrls={setRedirectUrls}
          setselecteMenu={setselecteMenu}
        />
      ) : (
        <AddRedirecturl
          setRedirectUrls={setRedirectUrls}
          setselecteMenu={setselecteMenu}
          RedirectUrls={RedirectUrls}
        />
      )}
    </DefaultLayout>
  );
}

export default MainPage;
