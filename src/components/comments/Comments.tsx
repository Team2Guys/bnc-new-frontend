"use client"
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { BsReply } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { TiSocialFacebook, TiSocialPinterest } from 'react-icons/ti';
import { useQueryClient } from '@tanstack/react-query';
import {
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton
} from "react-share";
import { toast } from 'react-toastify';
import CustomModal from 'components/ui/Modal';
type CommentType = 'parent' | 'nested';
interface CommentsProps {
  data: any;
}

function Comments({ data }: CommentsProps) {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [shareURL, setShareURL] = useState('');
  const [commentId, setcommentId] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    const currentURL = window.location.href;
    setShareURL(currentURL);
  }, []);

  const comments = data?.comments?.filter((comment: any) => comment.status === 'APPROVED') || [];

  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const currentComments = comments
    .slice()
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  console.log(currentComments,
    "currentComments"
  )
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '' };
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      newErrors.name = 'Name cannot contain numbers';
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      let id = !isModalOpen ? data.id : commentId
      let endpoint = !isModalOpen ? "addComments" : "addReply"


      try {
        setloading(true)
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${endpoint}/${id}`, formData)
        if (isModalOpen) {
          setIsModalOpen(false)
        }

        queryClient.invalidateQueries({ queryKey: ['blogs'] });

      } catch (error: any) {
        toast.error(error?.message || "Internal server errorr")
      } finally {
        setloading(false)

      }
      setFormData({ name: '', email: '', description: '' });
    }
  };
  const handleReplyClick = (commentId: string, type: CommentType) => {
    setFormData({ name: '', email: '', description: '' });
    console.log(type, "type")
    setcommentId(commentId)
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  return (
    <div className='w-full'>
      <div className="flex justify-between items-center">
        <h4 className="text-20 font-semibold">Comments</h4>
        <div className="text-18 font-normal text-paralight flex items-center gap-2">
          Share:{' '}
          <span className="flex items-center gap-1">
            <FacebookShareButton url={shareURL}>
              <TiSocialFacebook size={20} />
            </FacebookShareButton>
            <PinterestShareButton url={shareURL} media={data?.posterImage?.imageUrl} >
              <TiSocialPinterest size={24} />
            </PinterestShareButton>
            <WhatsappShareButton
              url={shareURL}
              separator=":: "
            >
              <FaWhatsapp size={20} />
            </WhatsappShareButton>
          </span>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-5 space-y-5">
          <div className='gap-4 border border-[#9D9D9D] rounded-xl p-2 sm:p-4 space-y-4'>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className='sm:w-1/2 w-full space-y-4'>
                <div className='w-full'>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-transparent px-3 py-2 border border-bdrgrey rounded-lg w-full text-bdrgrey text-18"
                  />
                  {errors.name && <p className="text-red-500 text-14">{errors.name}</p>}
                </div>
                <div className='w-full'>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-transparent px-3 py-2 border border-bdrgrey rounded-lg w-full text-bdrgrey text-18"
                  />
                  {errors.email && <p className="text-red-500 text-14">{errors.email}</p>}
                </div>
              </div>
            </div>
            <textarea
              name="description"
              placeholder="Comment"
              required
              value={formData.description}
              onChange={handleInputChange}
              className="bg-transparent px-3 py-2 border border-bdrgrey rounded-lg w-full text-bdrgrey text-18"
              rows={6}
            ></textarea>
          </div>

          <div className='flex justify-between items-center'>
            <div>
              {(currentComments && currentComments.length > 0) &&
                <p className="text-18 font-normal text-darkgrey">
                  {comments.length} Comments
                </p>
              }
            </div>
            <div className="text-end">
              <button
                disabled={loading && !isModalOpen}
                type="submit"
                className="px-4 py-3 text-white bg-secondary hover:bg-primary rounded-3xl text-16 sm:text-18 font-semibold"
              >
                {(loading && !isModalOpen) ? <Loader color="#fff" /> : "Post Comment"}
              </button>
            </div>
          </div>
        </form>


        <div className='border-t border-[#EAEAEA] mt-5'>
          {(currentComments && currentComments.length > 0) && currentComments.map((item: any) => (
            <div key={item.id} className="leading-8 border-b border-[#EAEAEA] my-4">
              <div className="flex justify-between items-center">
                <h5 className="text-16 font-semibold">{item.name}</h5>
                <span className="text-darkgrey">
                  {item?.createdAt ? new Date(item.createdAt).toLocaleString('en-US', { month: 'long', day: '2-digit', year: 'numeric', }) : ''}
                </span>
              </div>
              <p className="leading-normal text-darkgrey text-18">{item.description}</p>
              <button className="flex items-center gap-1" onClick={() => handleReplyClick(item.id, 'parent')}>
                <BsReply className="text-[#CDB7AA]" size={18} />
                <span className="font-medium text-16">Reply</span>
              </button>
              {item?.replies.map((nestedItem: any) =>
              (
                <div key={nestedItem.id} className="mt-4 leading-8 ps-6">
                  <div className="flex justify-between items-center">
                    <h5 className="text-16 font-semibold">
                      {nestedItem.name}
                    </h5>
                    <span className="text-darkgrey">{nestedItem.createdAt && new Date(nestedItem.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="leading-normal text-darkgrey text-18">
                    {nestedItem.description}
                  </p>
                  <button className="flex items-center gap-1" onClick={() => handleReplyClick(item.id, 'nested')}>
                    <BsReply className="text-[#CDB7AA]" size={18} />
                    <span className="font-medium text-16">Reply</span>
                  </button>
                </div>
              )
              )}
            </div>
          ))}
        </div>


        {
          currentComments.length > 2 &&
          <div className="flex justify-center mt-4 gap-2">
            <span
              className={`mx-1 w-16 h-14 flex justify-center items-center font-medium cursor-pointer ${currentPage === 1
                ? 'opacity-0'
                : 'hover:bg-btnclr hover:text-white opacity-100'
                }`}
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
              }
            >
              <GoArrowLeft size={25} />
            </span>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-6 py-1 border rounded ${index + 1 === currentPage ? 'bg-btnclr text-white' : 'bg-transparent'
                  }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <span
              className={`mx-1 w-16 h-14 flex justify-center items-center font-medium cursor-pointer ${currentPage === totalPages
                ? 'opacity-0'
                : 'hover:bg-btnclr hover:text-white opacity-100'
                }`}
              onClick={() =>
                setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)
              }
            >
              <GoArrowRight size={25} />
            </span>
          </div>
        }

      </div>
      <CustomModal
        title="Reply to Comment"
        open={isModalOpen}
        onClose={handleModalClose}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name*"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="bg-transparent px-3 py-2 border border-bdrgrey rounded-lg w-full text-bdrgrey text-18"
          />
          {errors.name && <p className="text-red-500 text-14">{errors.name}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email*"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="bg-transparent px-3 py-2 border border-bdrgrey rounded-lg w-full text-bdrgrey text-18"
          />
          {errors.email && <p className="text-red-500 text-14">{errors.email}</p>}
          <textarea
            name="description"
            placeholder="Reply Comment"
            required
            value={formData.description}
            onChange={handleInputChange}
            className="bg-transparent px-3 py-2 border border-bdrgrey rounded-lg w-full text-bdrgrey text-18"
            rows={4}
          ></textarea>
          <div className="text-end">
            <button
              disabled={loading && isModalOpen}

              type="submit"
              className="px-6 py-3 text-white bg-primary rounded-3xl text-16 sm:text-18 font-medium"
            >
              {loading && isModalOpen ? <Loader color="#fff" /> : "Post Reply"}

            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
}

export default Comments;
