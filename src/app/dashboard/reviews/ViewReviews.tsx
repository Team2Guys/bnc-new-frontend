"use client"

import ViewsTableHeader from 'components/Dashboard/TableHeader/ViewsTableHeader';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import revalidateTag from 'components/ServerActons/ServerAction';
import Table from 'components/ui/Table';
import { deleteReview } from 'config/fetch';
import Image from 'next/image';
import React, { SetStateAction, useState } from 'react'
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { IREVIEWS } from 'types/general';

import { DateFormatHandler } from 'utils/helperFunctions';

interface IView_Reviews {
    review: IREVIEWS[],
    setselecteMenu: React.Dispatch<SetStateAction<string>>,
    setEditsetReview: React.Dispatch<SetStateAction<IREVIEWS | undefined>>,
}

export default function ViewReviews({
    review,
    setselecteMenu,
    setEditsetReview
}: IView_Reviews) {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setloading] = useState<number | undefined>()

    const canDeleteReiview = true;
    const canEditReiview = true;
    const canAddReiview = true;



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
            await deleteReview(key)
            revalidateTag('reviews');

        } catch (err) {
            console.log(err,)
            throw err
        } finally {
            setloading(key)
        }
    };

    const columns = [
        {
            title: 'Image',
            key: 'posterImageUrl',
            render: (record: IREVIEWS) => (
                <Image
                    src={record?.posterImageUrl?.imageUrl || "/assets/images/dummy-avatar.jpg"}
                    alt={`Image of ${record?.name}`}
                    width={50}
                    loading='lazy'
                    className="h-[50px] rounded-md object-contain"
                    height={50}
                />
            ),
        },
        {
            title: 'Name',
            key: 'name',
        },

        {
            title: 'Create At',
            key: 'createdAt',
            render: (record: IREVIEWS) =>
                record?.createdAt ? new Date(record.createdAt).toLocaleString('en-US', { hour12: true }).replace(/:\d{2}\s/, ' ') : null,
        },
        {
            title: 'Updated At',
            key: 'date',
            render: (record: IREVIEWS) => {
                const createdAt = new Date(record?.updatedAt ?? "");
                return <span>{DateFormatHandler(createdAt)}</span>;
            }
        },
        {
            title: 'Edit',
            key: 'Edit',
            render: (record: IREVIEWS) => (
                <LiaEdit
                    className={`${canEditReiview ? 'cursor-pointer' : ''} ${!canEditReiview ? 'cursor-not-allowed text-slate-200' : ''
                        }`}
                    size={20}
                    onClick={() => {
                        if (canEditReiview) {
                            setEditsetReview(record);
                            setselecteMenu('Add Products');
                        }
                    }}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: IREVIEWS) => (
                loading == record.id ? "Deleting" :
                    <RiDeleteBin6Line
                        className={`${canDeleteReiview ? 'text-red-600 cursor-pointer' : ''} ${!canDeleteReiview ? 'cursor-not-allowed text-slate-200' : ''
                            }`}
                        size={20}
                        onClick={() => {
                            console.log(record, "id")
                            // if (canDeleteReiview) {
                            confirmDelete(record.id);
                            // }
                        }}
                    />
            ),
        },
    ];

    return (
        <>
        <Breadcrumb pageName={"View Review"} />
            <ViewsTableHeader
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                canAdd={canAddReiview}
                setEdit={setEditsetReview}
                setMenuType={setselecteMenu}
                menuTypeText='Add Review'
            />
            <Table<IREVIEWS>
                key={review?.map(r => r.id).join(',')}
                data={review}
                columns={columns}
                rowKey="id"
            />

        </>
    )
}
