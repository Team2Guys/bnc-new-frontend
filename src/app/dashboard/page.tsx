'use client';
import dynamic from 'next/dynamic';
import ProtectedRoute from 'hooks/AuthHookAdmin';

const ECommerce = dynamic(() => import('components/Dashboard/E-commerce'), {
  ssr: false,
});
const DefaultLayout = dynamic(() => import('components/Dashboard/Layouts/DefaultLayout'), {
  ssr: false,
});


function Home() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}

export default ProtectedRoute(Home);
