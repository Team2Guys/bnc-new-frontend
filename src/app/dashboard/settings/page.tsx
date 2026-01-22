'use client';
import React, { useState, useEffect } from 'react';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import Image from 'next/image';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { useAppSelector } from 'components/Others/HelperRedux';
import {
  uploadPhotosToBackend,
  ImageRemoveHandler,
} from 'utils/helperFunctions';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'components/Others/HelperRedux';
import { loggedInAdminAction } from '../../../redux/slices/AdminsSlice';
import { IMAGE_INTERFACE } from 'types/interfaces';
import { CiMail } from 'react-icons/ci';
import Loader from 'components/Loader/Loader';

const Settings = () => {
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  const token = Cookies.get('2guysAdminToken');
  const dispatch = useAppDispatch();
  let AdminType = loggedInUser && loggedInUser.role == 'super-Admin';
  const [loading, setloading] = useState(false);

  const initialFormData = {
    fullname: loggedInUser ? `${loggedInUser.fullname}` : '',
  };

  const initialValue = {
    name: loggedInUser ? `${loggedInUser.email}` : '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [profilePhoto, setProfilePhoto] = useState<IMAGE_INTERFACE[]>([]);

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      let imageUrl: any = await uploadPhotosToBackend([file]);
      imageUrl ? setProfilePhoto([imageUrl]) : null;
    }
  };

  const adminUpdateHandler = async () => {
    try {
      let initialFormData = {
        email: loggedInUser.email,
        fullname: formData.fullname,
        posterImageUrl: loggedInUser.posterImageUrl,
      };

      if (loggedInUser) {
        let { fullname, posterImageUrl, ...extractedData } = loggedInUser;
        console.log(fullname, posterImageUrl, 'fullname');

        if (profilePhoto && profilePhoto.length > 0) {
          initialFormData = {
            ...initialFormData,
            posterImageUrl: profilePhoto[0],
          };
        }

        let combinedData = {
          ...initialFormData,
          ...extractedData,
        };

        let response: any = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/editAdmin/${loggedInUser.id}`,
          combinedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 200) {
          console.log('Admin updated successfully:', response.data);
        } else {
          console.error('Failed to update admin');
        }
      }
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  useEffect(() => {
    setFormData(initialFormData);
  }, [loggedInUser]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setloading(true);
      await adminUpdateHandler();
      await AddminProfileTriggerHandler();
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setloading(false);
    }
  };

  const AddminProfileTriggerHandler = async () => {
    try {
      let user: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/get-admin-handler`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(loggedInAdminAction(user.data));
    } catch (err: any) {
      console.log(err, 'err');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loggedInUser && loggedInUser.profilePhoto) {
      Object.keys(loggedInUser.profilePhoto).length > 0
        ? setProfilePhoto([loggedInUser.profilePhoto])
        : null;
    }
  }, [loggedInUser]);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb pageName="Settings" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Photo Section */}
          <div className="rounded-lg bg-white shadow-md dark:bg-lightdark">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-strokedark">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Profile Photo
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {profilePhoto && profilePhoto.length > 0 ? (
                  profilePhoto.map((photo, index: number) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden border border-gray-300">
                        <Image
                          className="h-full w-full object-cover"
                          src={photo?.imageUrl || '/images/dummy-avatar.jpg'}
                          width={64}
                          height={64}
                          alt="User"
                        />
                      </div>
                      <div>
                        <p className="label_main">Edit your photo</p>
                        <div className="flex gap-3 mt-1">
                          <button
                            className="text-sm text-red-500 hover:underline"
                            type="button"
                            onClick={() =>
                              ImageRemoveHandler(
                                photo?.public_id ? photo?.public_id : '',
                                setProfilePhoto,
                              )
                            }
                          >
                            Delete
                          </button>
                          <button
                            className="text-sm text-primary hover:underline"
                            type="button"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-16 w-16 rounded-full overflow-hidden border border-gray-300">
                    <Image
                      className="h-full w-full object-cover"
                      src={
                        loggedInUser?.posterImageUrl
                          ? loggedInUser.posterImageUrl.imageUrl
                          : '/images/dummy-avatar.jpg'
                      }
                      width={64}
                      height={64}
                      alt="User"
                    />
                  </div>
                )}
              </div>

              {/* Upload Box */}
              <div className="relative flex flex-col items-center justify-center h-40 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-strokedark dark:bg-meta-4">
                <input
                  disabled={AdminType}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <span className="inline-block p-3 rounded-full border border-primary bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#c72031"
                        d="M10 16v-5h4v5h5l-7 7-7-7h5zm-4-16v2h12v-2h-12zm-4 4h20v2h-20v-2z"
                      />
                    </svg>
                  </span>
                  <p className="mt-3 text-sm text-gray-600">
                    <span className="font-medium text-primary">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </p>
                  <p className="text-xs ">SVG, PNG, JPG or GIF (max 800x800)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="lg:col-span-2 rounded-lg bg-white shadow-md dark:bg-lightdark">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-strokedark">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                    htmlFor="fullname"
                  >
                    Full Name
                  </label>
                  <input
                    disabled={AdminType}
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-black shadow-sm focus:border-primary focus:ring-2 focus:ring-primary dark:border-strokedark dark:bg-lightdark dark:text-white"
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="mb-2 block text-sm font-medium dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 dark:text-white">
                      <CiMail size={20} />
                    </span>
                    <input
                      className="w-full rounded-md border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-black shadow-sm focus:border-primary focus:ring-2 focus:ring-primary dark:border-strokedark dark:bg-lightdark dark:text-white"
                      type="email"
                      id="emailAddress"
                      value={initialValue.name}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-6 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <Loader color="#fff" /> : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProtectedRoute(Settings);
