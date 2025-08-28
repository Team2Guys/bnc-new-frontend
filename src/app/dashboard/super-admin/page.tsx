import dynamic from "next/dynamic";
import { getAllAdmins } from 'config/fetch';
import { cookies } from 'next/headers'

const Admins = dynamic(() => import('./Admins'))

const SuperAdmin_handler = async () => {
  const Cookies = await cookies()
  const token  = Cookies.get('superAdminToken');
  let admins = await getAllAdmins(token?.value)

  console.log(token)
  return (
      <Admins adminsData={admins || []} />
  );
};

export default SuperAdmin_handler;
