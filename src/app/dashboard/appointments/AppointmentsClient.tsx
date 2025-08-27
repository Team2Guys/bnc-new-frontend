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
                  <div className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
                    {selectedAppointment.name[0]}
                  </div>
                  <span className="text-lg font-bold">
                    {selectedAppointment.name}
                  </span>
                </div>
              }
              open={isModalVisible}
              onClose={handleCloseModal}
              
            >
              <div className="space-y-4 p-4">
                <div className="flex items-start">
                  <span className="w-1/3 font-semibold">Preferred Contact Method:</span>
                  <span className="w-2/3">{selectedAppointment.prefered_contact_method}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-1/3 font-semibold">Windows:</span>
                  <span className="w-2/3">{selectedAppointment.windows}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-1/3 font-semibold">Product Type:</span>
                  <span className="w-2/3">{selectedAppointment.product_type}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-1/3 font-semibold">How User Found Us:</span>
                  <span className="w-2/3">{selectedAppointment.how_user_find_us}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-1/3 font-semibold">User Query:</span>
                  <span className="w-2/3">{selectedAppointment.user_query}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-1/3 font-semibold">Preferred Date:</span>
                  <span className="w-2/3">{selectedAppointment.prefered_Date}</span>
                </div>
              </div>
            </CustomModal>
          )}
        </>

      </div>
    </DefaultLayout>
  );
};

export default ProtectedRoute(AppointmentsClient);