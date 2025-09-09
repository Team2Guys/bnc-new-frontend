'use client';
import React, { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import Cookies from 'js-cookie';
import { createAdmin, formDataTypes } from 'types/interfaces';
import Input from 'components/Common/regularInputs';
import { checkboxData, intitalValues } from 'data/data';
import revalidateTag from 'components/ServerActons/ServerAction';
import Checkbox from 'components/ui/Checkbox';
import { CheckboxProps } from 'types/types';
import { showAlert } from 'utils/Alert';

const CreateAdmin = ({ setselecteMenu, edit_admins, setedit_admins }: createAdmin) => {
  const [formData, setFormData] = useState<formDataTypes>(edit_admins ? edit_admins : intitalValues);


  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange: CheckboxProps['onChange'] = (e: any) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async () => {
    try {
      setError('');
      let token = Cookies.get('superAdminToken');
      if (!token) return null;

      let paswordFlag = edit_admins ? false : !formData.password

      if (!formData.fullname || !formData.email || paswordFlag)
        throw new Error('Fields are required');

      setLoading(true);
      let url = edit_admins ? `/api/admins/editAdmin/${edit_admins.id}` : `/api/admins/add-admin`
      let method_type: "post" | "put" = edit_admins ? "put" : "post"

      let response: any = await axios[method_type](`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      );
      revalidateTag('admins')
      console.log(response, 'response');
      showAlert({
        title: `Admin has been successfully ${edit_admins ? "Edited" : "Created"}`,
        icon: "success",
      });
      setFormData(intitalValues);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddAllPermissions = () => {
    setFormData({
      ...formData,
      canAddProduct: true,
      canEditProduct: true,
      canDeleteProduct: true,
      canAddCategory: true,
      canDeleteCategory: true,
      canEditCategory: true,
      canAddSubCategory: true,
      canDeleteSubCategory: true,
      canEditSubCategory: true,
      canViewAppointments: true,
      canVeiwAdmins: true,
      canVeiwTotalproducts: true,
      canVeiwTotalCategories: true,
      canVeiwTotalSubCategories: true,
      canAddBlog: true,
      canDeleteBlog: true,
      canEditBlog: true,
    });


  };


  const handleClearAllPermissions = () => {
    setFormData({
      ...formData,
      canAddProduct: false,
      canEditProduct: false,
      canDeleteProduct: false,
      canAddCategory: false,
      canDeleteCategory: false,
      canEditCategory: false,
      canAddSubCategory: false,
      canDeleteSubCategory: false,
      canEditSubCategory: false,
      canViewAppointments: false,
      canVeiwAdmins: false,
      canVeiwTotalproducts: false,
      canVeiwTotalCategories: false,
      canVeiwTotalSubCategories: false,
      canAddBlog: false,
      canDeleteBlog: false,
      canEditBlog: false,
    });
  };

  return (
    <div className="max-w-screen-md mx-auto rounded-md shadow-xl mt-1 mb-5 dark:bg-lightdark p-6">
      {/* Back button */}
      <div
        className="text-lg font-black mb-6 flex items-center gap-2 dark:text-white w-fit p-2 cursor-pointer"
        onClick={() => {
          setselecteMenu('AllAdmin');
          setedit_admins && setedit_admins(undefined);
        }}
      >
        <IoMdArrowRoundBack /> Back
      </div>

      <p className="text-2xl mb-6 dark:text-white font-semibold">
        {edit_admins ? 'Edit Admin' : 'Create New Admin'}
      </p>

      {/* Form fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-black dark:text-white block mb-1">
            Full Name
          </label>
          <Input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="text-black dark:text-white block mb-1">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-black dark:text-white block mb-1">
            Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Permissions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {checkboxData.map((checkbox, index) => (
          <Checkbox
            key={index}
            id={checkbox.name}
            name={checkbox.name}
            label={checkbox.label}
            checked={formData[checkbox.name as keyof typeof formData] as boolean}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>

      {/* Permission actions */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-primary rounded text-white"
          onClick={handleClearAllPermissions}
        >
          Clear All
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-primary rounded text-white"
          onClick={handleAddAllPermissions}
        >
          Add All permissions
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-center mt-4">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Submit button */}
      <div className="text-center mt-6">
        <button
          disabled={loading}
          className="bg-primary text-white w-full"
          onClick={handleSubmit}
        >
          {loading ? <Loader color="#fff" /> : edit_admins ? 'Edit Admin' : 'Add Admin'}
        </button>
      </div>
    </div>
  );
};

export default CreateAdmin;
