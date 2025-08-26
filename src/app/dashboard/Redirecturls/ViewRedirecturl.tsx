"use client"
import revalidateTag from 'components/ServerActons/ServerAction';
import Table from 'components/ui/Table';
import { deleteRedirectUrl } from 'config/fetch';
import React, { SetStateAction, useState } from 'react'
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { RedirectUrls } from 'types/general';
import { DateFormatHandler } from 'utils/helperFunctions';

interface IView_RedirectUrls {
    Redirecturls: RedirectUrls[],
    setselecteMenu: React.Dispatch<SetStateAction<string>>,
    setRedirectUrls: React.Dispatch<SetStateAction<RedirectUrls | undefined>>,
}

export default function ViewRedirecturl({
    Redirecturls,
    setselecteMenu,
    setRedirectUrls
}: IView_RedirectUrls) {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setloading] = useState<number | undefined>()

    const canDeleteProduct = true;
    const canEditproduct = true;
    const canAddProduct = true;



    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const confirmDelete = (key: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, the Sub Category cannot be recovered.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            console.log(result, "result")
            if (result.isConfirmed) {
                handleDelete(key);
            }
        }).catch((err) => {
            console.log(err)
        });
    };


    const handleDelete = async (key: number) => {
        try {
            setloading(key)
            await deleteRedirectUrl(key)
            revalidateTag('reviews');

        } catch (err) {
            console.log(err, "error")

            throw err;
        } finally{
                     setloading(undefined)
        }
    };

    const columns = [

        {
            title: 'Url',
            key: 'url',
        },

        {
            title: 'Create At',
            key: 'createdAt',
            render: (record: RedirectUrls) => {
                const createdAt = new Date(record?.createdAt ?? "");
                return <span>{DateFormatHandler(createdAt)}</span>;
            }
        },
        {
            title: 'Updated At',
            key: 'date',
            render: (record: RedirectUrls) => {
                const createdAt = new Date(record?.updatedAt ?? "");
                return <span>{DateFormatHandler(createdAt)}</span>;
            }
        },
        {
            title: 'Edit',
            key: 'Edit',
            render: (record: RedirectUrls) => (
                <LiaEdit
                    className={`${canEditproduct ? 'cursor-pointer' : ''} ${!canEditproduct ? 'cursor-not-allowed text-slate-200' : ''
                        }`}
                    size={20}
                    onClick={() => {
                        if (canEditproduct) {
                            setRedirectUrls(record);
                            setselecteMenu('Add RedirectUrls');
                        }
                    }}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: RedirectUrls) => (
                loading && loading === record.id ? "Deleting..." :
                    <RiDeleteBin6Line
                        className={`${canDeleteProduct ? 'text-red-600 cursor-pointer' : ''} ${!canDeleteProduct ? 'cursor-not-allowed text-slate-200' : ''
                            }`}
                        size={20}
                        onClick={() => {
                            console.log(record, "id")
                            // if (canDeleteProduct) {
                            confirmDelete(record.id);
                            // }
                        }}
                    />
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-between gap-2 mb-4 items-center flex-nowrap">
                <input
                    className="search_input"
                    type="search"
                    placeholder="Search Review"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div>
                    <p
                        className={`dashboard_primary_button ${canAddProduct
                                ? 'cursor-pointer text-white bg-primary '
                                : 'cursor-not-allowed bg-gray-500 text-white'
                            }`}
                        onClick={() => {
                            if (canAddProduct) {
                                setselecteMenu('Add RedirectUrls');
                                setRedirectUrls(undefined);
                            }
                        }}
                    >
                        Add Redirect Urls
                    </p>
                </div>
            </div>
              {Redirecturls && Redirecturls.length > 0 ? (
                    <Table<RedirectUrls>
                            data={Redirecturls}
                            columns={columns}
                            rowKey="id"
                        />
                ) : (
                    <p className="dark:text-white">No Blogs found</p>
                )}
        
        </>
    )
}
