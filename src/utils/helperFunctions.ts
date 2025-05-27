
import axios, { AxiosResponse} from 'axios';
import { blindsSubcategories, curtainsSubcategories, generateSlug, shuttersSubcategories } from 'data/data';
import { ChangedProductUrl_handler, predefinedPaths } from 'data/urls';

import Cookies from 'js-cookie';
import React from 'react';
import { IProduct } from 'types/types';
const token = Cookies.get('2guysAdminToken');
const superAdmintoken = Cookies.get('superAdminToken');
const finalToken = token ? token : superAdmintoken;


export const uploadPhotosToBackend = async (files: File[], s3Flag?:boolean): Promise<any[]> => {
  const formData = new FormData();

  if (files.length === 0) throw new Error('No files found');
let urlsEndpoint = s3Flag ? "file-upload/upload-s3" : "file-upload"
  try {
    for (const file of files) {
      console.log('hello from files');
      formData.append('file', file);
    }

    const response: AxiosResponse<any> = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${urlsEndpoint}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: any,
) => {
 
  console.log(imagePublicId);
  try {
    let awsS3Flag = imagePublicId.includes("s3") ? "DelImages3" : "DelImage"
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/file-upload/${awsS3Flag}/${imagePublicId}`,
    );
    console.log('Image removed successfully:', response.data);
    setterFunction((prev: any) =>
      prev.filter((item: any) => item.public_id != imagePublicId),
    );
  } catch (error) {
    console.error('Failed to remove image:', error);
  }
};


export const Api_handler = async (
  Endpoint: string,
  data: any,
  method: 'get' | 'post' | 'put' | 'delete',
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${finalToken}`},
    };

    let response;
    if (method === 'get' || method === 'delete') {
      response = await axios[method](
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/${Endpoint}`,
        config,
      );
    } else {
      response = await axios[method](
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/${Endpoint}`,
        data,
        config,
      );
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || JSON.stringify(error),
    );
  }
};




export const UpdateShutterTitle = (title: string): string => {
  let updatedTitle = title
    .replace(/Wooden Shutters/i, '')
    .replace(/plantation shutters/i, '')
    .trim();
  return updatedTitle;
};


export const getPath = (product: IProduct) => {
    const parent = generateSlug(product.category?.title);
    const slug = ChangedProductUrl_handler(product.title);
    const basePath =product.href && parent? `${window.origin}/${product.href}`: `/${slug}`;

    const path = predefinedPaths[slug as keyof typeof predefinedPaths] ||
      (slug === 'hotels-restaurants-blinds-curtains'? basePath : `/${parent?.toLowerCase() === 'shutters' ? `${parent.toLowerCase()}-range`
          : parent?.toLowerCase()
        }${['dimout-roller-blinds', 'sunscreen-roller-blinds', 'blackout-roller-blinds'].includes(slug)
          ? '/roller-blinds'
          : ''
        }/${slug}`);
    return path+"/";
  };


const subcategoryMap: Record<string, string[]> = {
  blinds: blindsSubcategories,
  shutters: shuttersSubcategories,
  curtains: curtainsSubcategories,
};

export const getSubcategoriesByCategory = (categoryName: string): string[] => {
  return subcategoryMap[categoryName?.toLowerCase()] || [];
};



  export const handleImageAltText = (
    index: number,
    newImageIndex: string,
    setImagesUrlhandler: React.Dispatch<
      React.SetStateAction<any[] | undefined>
    >,
    variantType: string
  ) => {
    setImagesUrlhandler((prev: any[] | undefined) => {
      if (!prev) return [];

      const updatedImagesUrl = prev?.map((item: any, i: number) =>
        i === index ? { ...item, [variantType]: newImageIndex } : item
      );
      return updatedImagesUrl;
    });
  };


  export const DateFormatHandler = (input: Date | string) => {
  if (!input) return "Not available";

  const parsedDate = typeof input === "string" ? new Date(input) : input;

  if (isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(parsedDate).toUpperCase();
};



 export const getRandomColor = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

  }
