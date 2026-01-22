'use client';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import AllAdmin from 'components/SuperAdmin/AllAdmin/AllAdmin';
import CreateAdmin from 'components/SuperAdmin/CreateAdmin/CreateAdmin';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import React, { useState } from 'react';
import { formDataTypes } from 'types/interfaces';

const SuperAdmin = ({ adminsData }: { adminsData: any[] }) => {
  const [selecteMenu, setselecteMenu] = useState<string | null | undefined>(
    'AllAdmin',
  );
  const [edit_admins, setedit_admins] = useState<formDataTypes | undefined>();

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Super Admin" />
        <div className="mt-10">
          {selecteMenu == 'AllAdmin' ? (
            <AllAdmin
              setselecteMenu={setselecteMenu}
              setedit_admins={setedit_admins}
              adminsData={adminsData}
            />
          ) : (
            <CreateAdmin
              setselecteMenu={setselecteMenu}
              edit_admins={edit_admins}
              setedit_admins={setedit_admins}
            />
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default ProtectedRoute(SuperAdmin);
