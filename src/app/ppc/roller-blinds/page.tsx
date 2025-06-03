import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Custom_Roller = dynamic(() => import('./Custom_Roller'));


export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const RollerMain = () => {
  return (
    <Suspense fallback='loading...'>
      <Custom_Roller />
    </Suspense>
  );
};

export default RollerMain;