'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SidebarLinkGroup from './SidebarLinkGroup';
import {
  MdKeyboardArrowLeft,
  MdOutlineDashboard,
  MdOutlineKeyboardArrowDown,
  MdProductionQuantityLimits,
} from 'react-icons/md';
import {  GrUserAdmin } from 'react-icons/gr';
import { useAppSelector } from 'components/Others/HelperRedux';
import { IoSettingsOutline } from 'react-icons/io5';
import { TbGardenCartOff } from 'react-icons/tb';
import { BsArrowReturnRight } from 'react-icons/bs';
import { ImBlog } from "react-icons/im";
import { CgListTree } from 'react-icons/cg';
import { FaChalkboardUser } from 'react-icons/fa6';


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  let superAdmin = loggedInUser && loggedInUser.role !== 'Admin';

  const path = usePathname().split("/").filter((boolean) => boolean).join("/");
  let pathname = "/" + path

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = 'true';

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );
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

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-secondary dark:border-r dark:bg-dashboardDark duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-2">
        <Link href="/">
          <Image
            width={140}
            height={140}
            src={'/assets/images/whitelogo.png'}
            className='w-auto h-auto'
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
              <SidebarLinkGroup activeCondition={pathname === '/dashboard'}>
                {(handleClick, open) => {
                  return (
                    <>
                      {/* Main Link */}
                      <Link
                        href="/dashboard"
                       className={`relative flex items-center gap-2 group dashboard_sidebar_links 
    ${pathname === '/dashboard' ? 'dashboard_sidebar_Active_links' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <MdOutlineDashboard size={20} className="text-white transition-transform duration-500 " />
                        <span className="ml-2">Dashboard</span>
                        <MdOutlineKeyboardArrowDown
                          size={24}
                          className={`MdOutlineKeyboardArrowDown ${open ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={`db_dropdown ${open ? 'max-h-60 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                          }`}
                      >
                        <ul className="db_ui_link">
                          <li
                            className={`db_ul_li_link ${open ? 'opacity-100' : 'opacity-0'
                              }`}
                          >
                            <BsArrowReturnRight
                              size={25}
                              className="db_main_link"
                            />
                            <Link
                              href="/dashboard"
                              className={`sidebar_inner_link text-white ${pathname === '/dashboard'
                                  ? ' db_inner_sub_cat_link'
                                  : 'db_inner_sub_cat_link_hover '
                                }`}
                            >
                              eCommerce
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* ================= Category ================= */}
              <SidebarLinkGroup activeCondition={pathname === '/dashboard/category'}>
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="#"
                        className={`relative flex items-center gap-2 group dashboard_sidebar_links ${pathname === '/dashboard/category' && 'dashboard_sidebar_Active_links'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <CgListTree size={20} className="text-white" />
                        <span className="ml-2">Category</span>
                        <MdOutlineKeyboardArrowDown
                          size={24}
                          className={`MdOutlineKeyboardArrowDown ${open ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={`db_dropdown ${open ? 'max-h-60 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                          }`}
                      >
                        <ul className="db_ui_link">
                          <li
                            className={`db_ul_li_link ${open ? 'opacity-100' : 'opacity-0'
                              }`}
                          >
                            <BsArrowReturnRight size={25} className="db_main_link" />
                            <Link
                              href="/dashboard/category"
                              className={`sidebar_inner_link ${pathname === '/dashboard/category'
                                  ? 'db_inner_sub_cat_link'
                                  : 'db_inner_sub_cat_link_hover'
                                }`}
                            >
                              View Categories
                            </Link>
                          </li>

                          <li
                            className={`sub_cat_link ${open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                              }`}
                          >
                            <BsArrowReturnRight size={25} className="db_main_link" />
                            <Link
                              href="/dashboard/subcategory"
                              className={`sidebar_inner_link ${pathname === '/dashboard/subcategory'
                                  ? 'db_inner_sub_cat_link'
                                  : 'db_inner_sub_cat_link_hover'
                                }`}
                            >
                              View Sub Categories
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* ================= Products ================= */}
              <SidebarLinkGroup activeCondition={pathname === '/dashboard/products'}>
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard/products"
                        className={`relative flex items-center gap-2 group dashboard_sidebar_links ${pathname === '/dashboard/products' && 'dashboard_sidebar_Active_links'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <MdProductionQuantityLimits size={20} className="text-white" />
                        <span className="ml-2">Products</span>
                        <MdOutlineKeyboardArrowDown
                          size={24}
                          className={`MdOutlineKeyboardArrowDown ${open ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={`db_dropdown ${open ? 'max-h-60 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                          }`}
                      >
                        <ul className="db_ui_link">
                          <li
                            className={`db_ul_li_link ${open ? 'opacity-100' : 'opacity-0'
                              }`}
                          >
                            <BsArrowReturnRight size={25} className="db_main_link" />
                            <Link
                              href="/dashboard/products"
                              className={`sidebar_inner_link ${pathname === '/dashboard/products'
                                  ? 'db_inner_sub_cat_link'
                                  : 'db_inner_sub_cat_link_hover'
                                }`}
                            >
                              View Products
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* ================= Blog ================= */}
              <SidebarLinkGroup activeCondition={pathname === '/dashboard/blog'}>
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        href="/dashboard/blog"
                        className={`relative flex items-center gap-2 group dashboard_sidebar_links ${pathname === '/dashboard/blog' && 'dashboard_sidebar_Active_links'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <ImBlog size={20} className="text-white" />
                        <span className="ml-2">Blog</span>
                        <MdOutlineKeyboardArrowDown
                          size={24}
                          className={`MdOutlineKeyboardArrowDown ${open ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={`db_dropdown ${open ? 'max-h-60 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                          }`}
                      >
                        <ul className="db_ui_link">
                          <li
                            className={`db_ul_li_link ${open ? 'opacity-100' : 'opacity-0'
                              }`}
                          >
                            <BsArrowReturnRight size={25} className="db_main_link" />
                            <Link
                              href="/dashboard/blog"
                              className={`sidebar_inner_link ${pathname === '/dashboard/blog'
                                  ? 'db_inner_sub_cat_link'
                                  : 'db_inner_sub_cat_link_hover'
                                }`}
                            >
                              View Blog
                            </Link>
                          </li>

                          <li
                            className={`sub_cat_link ${open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                              }`}
                          >
                            <BsArrowReturnRight size={25} className="db_main_link" />
                            <Link
                              href="/dashboard/comment"
                              className={`sidebar_inner_link ${pathname === '/dashboard/comment'
                                  ? 'db_inner_sub_cat_link'
                                  : 'db_inner_sub_cat_link_hover'
                                }`}
                            >
                              View Comment
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>



              {/* ================= Appointments ================= */}
              <SidebarLinkGroup activeCondition={pathname === '/dashboard/appointments'}>
                {(handleClick, open) => {
                  return (
                    <>
                      {/* Main Link */}
                      <Link
                        href="/dashboard/appointments"
                        className={`relative flex items-center gap-2 group dashboard_sidebar_links ${pathname === '/dashboard/appointments' && 'dashboard_sidebar_Active_links'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <FaChalkboardUser size={20} className="text-white" />
                        <span className="ml-2">Appointments</span>
                        <MdOutlineKeyboardArrowDown
                          size={24}
                          className={`MdOutlineKeyboardArrowDown ${open ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={`db_dropdown ${open ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                          }`}
                      >
                        <ul className="db_ui_link">
                          <li
                            className={`db_ul_li_link ${open ? 'opacity-100' : 'opacity-0'
                              }`}
                          >
                            <BsArrowReturnRight size={22} className="text-white" />
                            <Link
                              href="/dashboard/appointments"
                              className={`sidebar_inner_link ${pathname === '/dashboard/appointments'
                                  ? 'db_inner_sub_cat_link'
                                  : 'db_inner_sub_cat_link_hover'
                                }`}
                            >
                              View Appointments
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* ================= Generals ================= */}
              <SidebarLinkGroup activeCondition={pathname === '/dashboard/general'}>
                {(handleClick, open) => {
                  return (
                    <>
                      {/* Main Link */}
                      <Link
                        href="/dashboard/general"
                        className={`relative flex items-center gap-2 group dashboard_sidebar_links ${pathname === '/dashboard/general' && 'dashboard_sidebar_Active_links'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <TbGardenCartOff size={20} className="text-white" />
                        <span className="ml-2">Generals</span>
                        <MdOutlineKeyboardArrowDown
                          size={24}
                          className={`MdOutlineKeyboardArrowDown ${open ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={`db_dropdown ${open ? 'max-h-60 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                          }`}
                      >
                        <ul className="db_ui_link">
                          <li
                            className={`db_ul_li_link ${open ? 'opacity-100' : 'opacity-0'
                              }`}
                          >
                            <BsArrowReturnRight size={22} className="text-white" />
                            <Link
                              href="/dashboard/reviews"
                              className={`sidebar_inner_link ${pathname === '/dashboard/reviews'
                                  ? 'db_inner_sub_cat_link'
                                  : 'db_inner_sub_cat_link_hover'
                                }`}
                            >
                              View Reviews
                            </Link>
                          </li>

                          <li
                            className={`db_ul_li_link ${open ? 'opacity-100' : 'opacity-0'
                              }`}
                          >
                            <BsArrowReturnRight size={22} className="text-white" />
                            <Link
                              href="/dashboard/Redirecturls"
                              className={`sidebar_inner_link ${pathname === '/dashboard/Redirecturls'
                                  ? 'db_inner_sub_cat_link'
                                  : 'db_inner_sub_cat_link_hover'
                                }`}
                            >
                              View Redirecturls
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>



              {superAdmin ? (
                <li>
                  <Link
                    href="/dashboard/super-admin"
                    className={`group dashboard_sidebar_links ${pathname.includes('super-admin') &&
                      'dashboard_sidebar_Active_links'
                      }`}
                  >
                    <GrUserAdmin size={20} />
                    Admin
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  href="/dashboard/settings"
                  className={`group dashboard_sidebar_links ${pathname.includes('settings') &&
                    'dashboard_sidebar_Active_links'
                    }`}
                >
                  <IoSettingsOutline size={20} />
                  Settings
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
