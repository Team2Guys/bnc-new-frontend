'use client';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import useColorMode from 'hooks/useColorMode';
import { TbScanEye } from 'react-icons/tb';
import { IAppointments } from 'types/types';
import Table from 'components/ui/Table';
import CustomModal from 'components/ui/Modal';

const AppointmentsClient = ({ appointments }: { appointments: IAppointments[] }) => {
  const appointmentColumns = [
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Area',
      key: 'area',
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Phone #',
      key: 'phone_number',
    },
    {
      title: 'WhatsApp #',
      key: 'whatsapp_number',
    },
    {
      title: 'CreatedAt',
      key: 'createdAt',
      render: (record: IAppointments) => formatDate(record.createdAt),
    },
    {
      title: 'More Details',
      key: 'moreDetails',
      render: (record: IAppointments) => (
        <TbScanEye
          onClick={() => handleShowDetails(record)}
          className="text-30  cursor-pointer "
        />
      ),
    },
  ];
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredAppointments, setFilteredAppointments] = useState<IAppointments[]>([]);

  const [selectedAppointment, setSelectedAppointment] = useState<IAppointments | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colorMode, toggleColorMode] = useColorMode();
  console.log(toggleColorMode, 'toggleColorMode');

  const handleShowDetails = (record: IAppointments) => {
    setSelectedAppointment(record);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedAppointment(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return `${formattedDate} / ${formattedTime}`;
  }


  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (appointments) {

      const filtered = appointments
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((appointment: IAppointments) => ({
          ...appointment,
          prefered_Date: formatDate(appointment.prefered_Date),
        }))
        .filter((appointment: IAppointments) =>
          appointment.name?.toLowerCase().includes(lowercasedSearchTerm) ||
          appointment.area?.toLowerCase().includes(lowercasedSearchTerm) ||
          appointment.email?.toLowerCase().includes(lowercasedSearchTerm) ||
          appointment.phone_number?.toLowerCase().includes(lowercasedSearchTerm) ||
          appointment.whatsapp_number?.toLowerCase().includes(lowercasedSearchTerm) ||
          appointment.windows?.toLowerCase().includes(lowercasedSearchTerm) ||
          appointment.how_user_find_us?.toLowerCase().includes(lowercasedSearchTerm) ||
          appointment.user_query?.toLowerCase().includes(lowercasedSearchTerm) ||
          appointment.prefered_Date?.toLowerCase().includes(lowercasedSearchTerm)
        );



      setFilteredAppointments(filtered);
    }
  }, [searchTerm, appointments]);


  return (
    <DefaultLayout>
      <div className={colorMode === 'dark' ? 'dark' : ''}>
        <>
          <Breadcrumb pageName={'View Appointments'} />
          <div className="flex justify-between mb-4 items-center flex-wrap text-black dark:text-white pt-4">
            <input
              className="search_input"
              type="search"
              placeholder="Search Product"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {
            appointments && (
              <Table<IAppointments>
                data={filteredAppointments}
                columns={appointmentColumns}
                rowKey='id'
              />
            )
          }
          {isModalVisible && selectedAppointment && (
           <CustomModal
  title={
    <div className="flex items-center space-x-3">
      <div className="bg-gradient-to-r from-blue-600 border to-indigo-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-semibold shadow-md">
        {selectedAppointment.name[0]}
      </div>
      <span className="text-xl font-bol dark:text-white">
        {selectedAppointment.name}
      </span>
    </div>
  }
  open={isModalVisible}
  onClose={handleCloseModal}
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    {/* Preferred Contact Method */}
    {selectedAppointment.prefered_contact_method && (
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition border border-gray-50 dark:border-gray-100">
        <p className="appointment_popup_heading">
          Preferred Contact Method
        </p>
        <p className="mt-2 text-base font-semibold  dark:text-white">
          {selectedAppointment.prefered_contact_method}
        </p>
      </div>
    )}

    {/* Windows */}
    {selectedAppointment.windows && (
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition border border-gray-50 dark:border-gray-100">
        <p className="appointment_popup_heading">
          Windows
        </p>
        <p className="mt-2 text-base font-semibold  dark:text-white">
          {selectedAppointment.windows}
        </p>
      </div>
    )}

    {/* Product Type */}
   {selectedAppointment.product_type && (
  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition border border-gray-50 dark:border-gray-100">
    <p className="appointment_popup_heading">
      Product Type
    </p>
    <p className="mt-2 text-base font-semibold  dark:text-white">
      {selectedAppointment.product_type}
    </p>
  </div>
)}

    {/* How User Found Us */}
    {selectedAppointment.how_user_find_us && (
      <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition border border-gray-50 dark:border-gray-100">
        <p className="appointment_popup_heading">
          How User Found Us
        </p>
        <p className="mt-2 text-base font-semibold  dark:text-white">
          {selectedAppointment.how_user_find_us}
        </p>
      </div>
    )}

    {/* User Query (full width) */}
    {selectedAppointment.user_query && (
      <div className="md:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition border border-gray-50 dark:border-gray-100">
        <p className="appointment_popup_heading">
          User Query
        </p>
        <p className="mt-2 text-base font-medium  dark:text-white">
          {selectedAppointment.user_query}
        </p>
      </div>
    )}

    {/* Preferred Date (full width) */}
    {selectedAppointment.prefered_Date && (
      <div className="md:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition border border-gray-50 dark:border-gray-100">
        <p className="appointment_popup_heading">
          Preferred Date
        </p>
        <p className="mt-2 text-base font-semibold  dark:text-white">
          {selectedAppointment.prefered_Date}
        </p>
      </div>
    )}
  </div>
</CustomModal>


          )}
        </>

      </div>
    </DefaultLayout>
  );
};

export default ProtectedRoute(AppointmentsClient);