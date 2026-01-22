'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from 'components/Loader/Loader';
import { useAppDispatch } from 'components/Others/HelperRedux';
import { loggedInAdminAction } from '../redux/slices/AdminsSlice';
import axios from 'axios';
import Cookies from 'js-cookie';

function ProtectedRoute(WrappedComponent: any) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const AddminProfileTriggerHandler = async (
      token: string,
      adminFlag: boolean,
    ) => {
      try {
        let apiEndpoint = adminFlag
          ? 'getSuperAdminHandler'
          : 'get-admin-handler';
        let user: any = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/${apiEndpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(user, 'user');
        dispatch(loggedInAdminAction(user.data));
      } catch (err: any) {
        if (err.response?.data?.statusCode == 401) {
          Cookies.remove(adminFlag ? 'superAdminToken' : '2guysAdminToken');
          router.push('/dashboard/Admin-login');
          return;
        }
        console.log(err.response.data.statusCode, 'err');
      }
    };

    useEffect(() => {
      const token = Cookies.get('2guysAdminToken');
      const superAdmintoken = Cookies.get('superAdminToken');
      let Finaltoken = superAdmintoken ? superAdmintoken : token;
      if (!Finaltoken) {
        console.log('functoin called');
        router.push('/dashboard/Admin-login');
      } else {
        AddminProfileTriggerHandler(Finaltoken, superAdmintoken ? true : false);
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <div
          style={{
            background: '#FFF',
            zIndex: 1111,
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
            width: '-webkit-fill-available',
            justifyContent: 'center',
          }}
        >
          <Loader color="#fff" />
        </div>
      );
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  return Wrapper;
}

export default ProtectedRoute;
