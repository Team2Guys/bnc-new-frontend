import { fetchAppointments } from 'config/fetch';
import { cookies } from 'next/headers';
import AppointmentsClient from './AppointmentsClient';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
      <AppointmentsClient appointments={sortedFilteredAppointments} />
  );
};

export default AppointmentPage;
