'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from 'components/Others/HelperRedux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  const router = useRouter();

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });


  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const logoutHhandler = () => {
    try {
      Cookies.remove('2guysAdminToken');
      Cookies.remove('superAdminToken');
      router.push('/dashboard/Admin-login');
    } catch (err) {
      console.log(err);
    }
  };




  return (
    <div className="relative ">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center py-2 gap-4 text-white dark:text-white"
        href="#"
      >
        <span className="text-right lg:block">
          <span className="block text-sm font-medium text-white dark:text-white">
            {loggedInUser?.fullname}
          </span>
          <span className="block text-xs text-white dark:text-white">
            {loggedInUser?.role}
          </span>
        </span>

        <div className=" hidden sm:flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <Image
              className='h-12 w-12 rounded-full object-cover'
              src={
                loggedInUser && loggedInUser.posterImageUrl
                  ? loggedInUser.posterImageUrl.imageUrl
                  : '/assets/images/dummy-avatar.jpg'
              }
              width={55}
              height={55}
              alt="User"
            />
          </div>
        </div>

        <IoIosArrowDown className="text-white dark:text-white" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-2 flex w-60 flex-col rounded-sm border border-stroke bg-secondary dark:bg-dashboardDark  ${dropdownOpen === true ? 'block' : 'hidden'
          }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-3 dark:border-strokedark">
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out  lg:text-base text-white dark:text-white"
            >
              <FaRegUser size={20} />
              My Profile
            </Link>
          </li>
        </ul>
        <button
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out  lg:text-base text-white dark:text-white"
          onClick={logoutHhandler}
        >
          <RiLogoutBoxLine size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
