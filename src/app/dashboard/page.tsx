import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import {
  adminRecords,
  getLast7DaysStats,
  getMonthlyAppointments,
} from 'config/fetch';

import { redirect } from 'next/navigation';
import { STATUS } from 'types/general';

const ECommerce = dynamic(() => import('components/Dashboard/E-commerce'));
const DefaultLayout = dynamic(
  () => import('components/Dashboard/Layouts/DefaultLayout'),
);

async function Home() {
  const Cookies = await cookies();
  const token =
    Cookies.get('2guysAdminToken')?.value ||
    Cookies.get('superAdminToken')?.value;
  if (!token) return redirect('/dashboard/Admin-login');
  const [monthlyStats, weeklyStats, records] = await Promise.all([
    getMonthlyAppointments(token),
    getLast7DaysStats(token),
    adminRecords(token),
  ]);
  const categories = monthlyStats?.appointments?.map(
    (item: { month: string; Revenue: number; Orders: number }) => item.month,
  );
  const appointmentsData = monthlyStats?.appointments?.map(
    (item: { Appointments: string; Orders: number }) => item.Appointments || 0,
  );

  const charts = {
    categories,
    series: [{ name: 'Appointments', data: appointmentsData }],
  };

  const defaultArray = [
    {
      name: 'Appointments',
      data: weeklyStats?.map((item: STATUS) => item.Appointments),
    },
  ];

  const weeklyChart = {
    categories: weeklyStats?.map((item: STATUS) => item.day),
    series: defaultArray,
  };
  return (
    <DefaultLayout>
      <ECommerce
        records={records}
        chartData={charts}
        weeklyChart={weeklyChart}
      />
    </DefaultLayout>
  );
}

export default Home;
