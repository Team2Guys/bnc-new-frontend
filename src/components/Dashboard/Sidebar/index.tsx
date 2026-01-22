'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  MdKeyboardArrowLeft,
  MdOutlineDashboard,
  MdOutlineKeyboardArrowDown,
  MdProductionQuantityLimits,
} from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';
import { useAppSelector } from 'components/Others/HelperRedux';
import { IoSettingsOutline } from 'react-icons/io5';
import { TbGardenCartOff } from 'react-icons/tb';
import { BsArrowReturnRight } from 'react-icons/bs';
import { ImBlog } from 'react-icons/im';
import { CgListTree } from 'react-icons/cg';
import { FaChalkboardUser } from 'react-icons/fa6';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  let superAdmin = loggedInUser && loggedInUser.role !== 'Admin';

  const path = usePathname()
    .split('/')
    .filter((boolean) => boolean)
    .join('/');
  let pathname = '/' + path;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = 'true';

  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // Track which dropdown is currently open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // Function to handle dropdown clicks
  const handleDropdownClick = (dropdownName: string) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownName);
    }
  };

  // Check if a dropdown should be open based on current path
  const isDropdownOpen = (dropdownName: string, conditionPaths: string[]) => {
    if (openDropdown === dropdownName) return true;
    if (openDropdown === null) {
      return conditionPaths.some((path) => pathname.includes(path));
    }
    return false;
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-secondary dark:border-r dark:bg-dashboardDark duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-2">
        <Link href="/">
          <Image
            width={140}
            height={140}
            src={'/assets/images/whitelogo.png'}
            className="w-auto h-auto"
            alt="Logo"
            priority
          />
        </Link>
        <MdKeyboardArrowLeft
          className="block lg:hidden text-black bg-white rounded-md cursor-pointer"
          size={25}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-2 px-4 py-4 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white dark:text-white">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-4">
              {/* ================= Dashboard ================= */}
              <li>
                <div
                  className={`main_dropdown group  ${pathname === '/dashboard' ? 'bg-white text-secondary' : 'text-white hover:bg-white/10'}`}
                  onClick={() => handleDropdownClick('dashboard')}
                >
                  <MdOutlineDashboard
                    size={20}
                    className={`transition-transform duration-500 ${pathname === '/dashboard' ? 'text-secondary' : 'text-white'}`}
                  />
                  <span className="ml-2">Dashboard</span>
                  <MdOutlineKeyboardArrowDown
                    size={24}
                    className={`ml-auto transition-transform duration-300 ${isDropdownOpen('dashboard', ['/dashboard']) ? 'rotate-180' : 'rotate-0'} ${pathname === '/dashboard' ? 'text-secondary' : 'text-white'}`}
                  />
                </div>

                {/* Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen('dashboard', ['/dashboard'])
                      ? 'max-h-60 opacity-100 translate-y-0'
                      : 'max-h-0 opacity-0 -translate-y-2'
                  }`}
                >
                  <ul className="mt-1 pl-4">
                    <li
                      className={`transition-opacity duration-300 ${
                        isDropdownOpen('dashboard', ['/dashboard'])
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      <Link
                        href="/dashboard"
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                          pathname === '/dashboard'
                            ? 'bg-white text-secondary'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <BsArrowReturnRight size={18} />
                        eCommerce
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* ================= Category ================= */}
              <li>
                <div
                  className={`main_dropdown group  ${pathname.includes('/dashboard/category') || pathname.includes('/dashboard/subcategory') ? 'bg-white text-secondary' : 'text-white hover:bg-white/10'}`}
                  onClick={() => handleDropdownClick('category')}
                >
                  <CgListTree
                    size={20}
                    className={`${pathname.includes('/dashboard/category') || pathname.includes('/dashboard/subcategory') ? 'text-secondary' : 'text-white'}`}
                  />
                  <span className="ml-2">Category</span>
                  <MdOutlineKeyboardArrowDown
                    size={24}
                    className={`ml-auto transition-transform duration-300 ${isDropdownOpen('category', ['/dashboard/category', '/dashboard/subcategory']) ? 'rotate-180' : 'rotate-0'} ${pathname.includes('/dashboard/category') || pathname.includes('/dashboard/subcategory') ? 'text-secondary' : 'text-white'}`}
                  />
                </div>

                {/* Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen('category', [
                      '/dashboard/category',
                      '/dashboard/subcategory',
                    ])
                      ? 'max-h-60 opacity-100 translate-y-0'
                      : 'max-h-0 opacity-0 -translate-y-2'
                  }`}
                >
                  <ul className="mt-1 pl-4">
                    <li
                      className={`transition-opacity duration-300 ${
                        isDropdownOpen('category', [
                          '/dashboard/category',
                          '/dashboard/subcategory',
                        ])
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      <Link
                        href="/dashboard/category"
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                          pathname === '/dashboard/category'
                            ? 'bg-white text-secondary'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <BsArrowReturnRight size={18} />
                        View Categories
                      </Link>
                    </li>

                    <li
                      className={`transition-all duration-300 ${
                        isDropdownOpen('category', [
                          '/dashboard/category',
                          '/dashboard/subcategory',
                        ])
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                    >
                      <Link
                        href="/dashboard/subcategory"
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                          pathname === '/dashboard/subcategory'
                            ? 'bg-white text-secondary'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <BsArrowReturnRight size={18} />
                        View Sub Categories
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* ================= Products ================= */}
              <li>
                <div
                  className={`main_dropdown group  ${pathname.includes('/dashboard/products') ? 'bg-white text-secondary' : 'text-white '}`}
                  onClick={() => handleDropdownClick('products')}
                >
                  <MdProductionQuantityLimits
                    size={20}
                    className={`${pathname.includes('/dashboard/products') ? 'text-secondary' : 'text-white'}`}
                  />
                  <span className="ml-2">Products</span>
                  <MdOutlineKeyboardArrowDown
                    size={24}
                    className={`ml-auto transition-transform duration-300 ${isDropdownOpen('products', ['/dashboard/products']) ? 'rotate-180' : 'rotate-0'} ${pathname.includes('/dashboard/products') ? 'text-secondary' : 'text-white'}`}
                  />
                </div>

                {/* Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen('products', ['/dashboard/products'])
                      ? 'max-h-60 opacity-100 translate-y-0'
                      : 'max-h-0 opacity-0 -translate-y-2'
                  }`}
                >
                  <ul className="mt-1 pl-4">
                    <li
                      className={`transition-opacity duration-300 ${
                        isDropdownOpen('products', ['/dashboard/products'])
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      <Link
                        href="/dashboard/products"
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                          pathname === '/dashboard/products'
                            ? 'bg-white text-secondary'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <BsArrowReturnRight size={18} />
                        View Products
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* ================= Blog ================= */}
              <li>
                <div
                  className={`main_dropdown group ${pathname.includes('/dashboard/blog') || pathname.includes('/dashboard/comment') ? 'bg-white text-secondary' : 'text-white hover:bg-white/10'}`}
                  onClick={() => handleDropdownClick('blog')}
                >
                  <ImBlog
                    size={20}
                    className={`${pathname.includes('/dashboard/blog') || pathname.includes('/dashboard/comment') ? 'text-secondary' : 'text-white'}`}
                  />
                  <span className="ml-2">Blog</span>
                  <MdOutlineKeyboardArrowDown
                    size={24}
                    className={`ml-auto transition-transform duration-300 ${isDropdownOpen('blog', ['/dashboard/blog', '/dashboard/comment']) ? 'rotate-180' : 'rotate-0'} ${pathname.includes('/dashboard/blog') || pathname.includes('/dashboard/comment') ? 'text-secondary' : 'text-white'}`}
                  />
                </div>

                {/* Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen('blog', [
                      '/dashboard/blog',
                      '/dashboard/comment',
                    ])
                      ? 'max-h-60 opacity-100 translate-y-0'
                      : 'max-h-0 opacity-0 -translate-y-2'
                  }`}
                >
                  <ul className="mt-1 pl-4">
                    <li
                      className={`transition-opacity duration-300 ${
                        isDropdownOpen('blog', [
                          '/dashboard/blog',
                          '/dashboard/comment',
                        ])
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      <Link
                        href="/dashboard/blog"
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                          pathname === '/dashboard/blog'
                            ? 'bg-white text-secondary'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <BsArrowReturnRight size={18} />
                        View Blog
                      </Link>
                    </li>

                    <li
                      className={`transition-all duration-300 ${
                        isDropdownOpen('blog', [
                          '/dashboard/blog',
                          '/dashboard/comment',
                        ])
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                    >
                      <Link
                        href="/dashboard/comment"
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                          pathname === '/dashboard/comment'
                            ? 'bg-white text-secondary'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <BsArrowReturnRight size={18} />
                        View Comment
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* ================= Appointments ================= */}
              <li>
                <div
                  className={`main_dropdown group ${pathname.includes('/dashboard/appointments') ? 'bg-white text-secondary' : 'text-white hover:bg-white/10'}`}
                  onClick={() => handleDropdownClick('appointments')}
                >
                  <FaChalkboardUser
                    size={20}
                    className={`${pathname.includes('/dashboard/appointments') ? 'text-secondary' : 'text-white'}`}
                  />
                  <span className="ml-2">Appointments</span>
                  <MdOutlineKeyboardArrowDown
                    size={24}
                    className={`ml-auto transition-transform duration-300 ${isDropdownOpen('appointments', ['/dashboard/appointments']) ? 'rotate-180' : 'rotate-0'} ${pathname.includes('/dashboard/appointments') ? 'text-secondary' : 'text-white'}`}
                  />
                </div>

                {/* Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen('appointments', ['/dashboard/appointments'])
                      ? 'max-h-40 opacity-100 translate-y-0'
                      : 'max-h-0 opacity-0 -translate-y-2'
                  }`}
                >
                  <ul className="mt-1 pl-4">
                    <li
                      className={`transition-opacity duration-300 ${
                        isDropdownOpen('appointments', [
                          '/dashboard/appointments',
                        ])
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      <Link
                        href="/dashboard/appointments"
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                          pathname === '/dashboard/appointments'
                            ? 'bg-white text-secondary'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <BsArrowReturnRight size={18} />
                        View Appointments
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* ================= Generals ================= */}
              <li>
                <div
                  className={`main_dropdown group ${pathname.includes('/dashboard/reviews') || pathname.includes('/dashboard/Redirecturls') ? 'bg-white text-secondary' : 'text-white hover:bg-white/10'}`}
                  onClick={() => handleDropdownClick('general')}
                >
                  <TbGardenCartOff
                    size={20}
                    className={`${pathname.includes('/dashboard/reviews') || pathname.includes('/dashboard/Redirecturls') ? 'text-secondary' : 'text-white'}`}
                  />
                  <span className="ml-2">Generals</span>
                  <MdOutlineKeyboardArrowDown
                    size={24}
                    className={`ml-auto transition-transform duration-300 ${isDropdownOpen('general', ['/dashboard/reviews', '/dashboard/Redirecturls']) ? 'rotate-180' : 'rotate-0'} ${pathname.includes('/dashboard/reviews') || pathname.includes('/dashboard/Redirecturls') ? 'text-secondary' : 'text-white'}`}
                  />
                </div>

                {/* Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen('general', [
                      '/dashboard/reviews',
                      '/dashboard/Redirecturls',
                    ])
                      ? 'max-h-60 opacity-100 translate-y-0'
                      : 'max-h-0 opacity-0 -translate-y-2'
                  }`}
                >
                  <ul className="mt-1 pl-4">
                    <li
                      className={`transition-opacity duration-300 ${
                        isDropdownOpen('general', [
                          '/dashboard/reviews',
                          '/dashboard/Redirecturls',
                        ])
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      <Link
                        href="/dashboard/reviews"
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                          pathname === '/dashboard/reviews'
                            ? 'bg-white text-secondary'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <BsArrowReturnRight size={18} />
                        View Reviews
                      </Link>
                    </li>

                    <li
                      className={`transition-opacity duration-300 ${
                        isDropdownOpen('general', [
                          '/dashboard/reviews',
                          '/dashboard/Redirecturls',
                        ])
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      <Link
                        href="/dashboard/Redirecturls"
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                          pathname === '/dashboard/Redirecturls'
                            ? 'bg-white text-secondary'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <BsArrowReturnRight size={18} />
                        View Redirecturls
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {superAdmin ? (
                <li>
                  <Link
                    href="/dashboard/super-admin"
                    className={`flex items-center gap-2 py-3 px-4 rounded-md transition-all duration-300 ${
                      pathname.includes('super-admin')
                        ? 'bg-white text-secondary'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <GrUserAdmin size={20} />
                    <span>Admin</span>
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  href="/dashboard/settings"
                  className={`main_dropdown group ${
                    pathname.includes('settings')
                      ? 'bg-white text-secondary'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <IoSettingsOutline size={20} />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
