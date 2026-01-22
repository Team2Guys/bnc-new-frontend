import React from 'react';

import { fetchRedirectUrls } from 'config/fetch';
import MainPage from './MainPage';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function Page() {
  const Redirecturls = await fetchRedirectUrls();
  return <MainPage Redirecturls={Redirecturls} />;
}

export default Page;
