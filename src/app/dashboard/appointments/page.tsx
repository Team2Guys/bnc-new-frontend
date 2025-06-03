import dynamic from 'next/dynamic';
import { fetchAppointments } from 'config/fetch';
import { Suspense } from 'react';
const AppointmentsClient = dynamic(() => import("./AppointmentsClient"))
import { cookies } from 'next/headers';


const AppointmentPage = async () => {
  let Cookies = await cookies()

  const superAdmintoken = Cookies.get('superAdminToken');
  const token = Cookies.get('2guysAdminToken');

  let Finaltoken = superAdmintoken ? superAdmintoken : token;
  const appointments = await fetchAppointments(Finaltoken?.value as any);
  const sortedFilteredAppointments = appointments.sort(
    (a: any, b: any) => new Date(b.prefered_Date).getTime() - new Date(a.prefered_Date).getTime()
  );
  return (
    <Suspense fallback='loading...'>
      <AppointmentsClient appointments={sortedFilteredAppointments} />
    </Suspense>
  );
};

export default AppointmentPage;
