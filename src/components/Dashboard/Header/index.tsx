'use client';
import Link from 'next/link';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownUser from './DropdownUser';
import Image from 'next/image';
import { RiBarChartHorizontalLine } from 'react-icons/ri';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-secondary drop-shadow-1 dark:bg-dashboardDark dark:border-b  border-r-0 border-t-0 border-l-0">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden text-white dark:text-white">
          <RiBarChartHorizontalLine
            className="text-white dark:text-white cursor-pointer"
            size={25}
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
          />

          <Link className="block flex-shrink-0 lg:hidden" href="/dashboard">
            <Image
              width={100}
              height={100}
              src={'/assets/images/whitelogo.png'}
              alt="Logo"
              className='w-auto h-auto'
            />
          </Link>
        </div>

        <div className="hidden sm:block"></div>

        <div className="flex items-center gap-3 2xsm:gap-7 ">
          <DarkModeSwitcher />
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
