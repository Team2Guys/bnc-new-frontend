import dynamic from "next/dynamic";
import { getAllAdmins } from 'config/fetch';
import { cookies } from 'next/headers'
import { Suspense } from "react";

const Admins = dynamic(() => import('./Admins'))

const SuperAdmin_handler = async () => {
  const Cookies = await cookies()
  const token  = Cookies.get('superAdminToken');
  let admins = await getAllAdmins(token?.value)

  console.log(token)
  return (
    <Suspense fallback='loading...'>
      <Admins adminsData={admins || []} />
    </Suspense>
  );
};

export default SuperAdmin_handler;
