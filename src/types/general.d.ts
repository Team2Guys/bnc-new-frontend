import { ProductImages } from './types';

export interface IREVIEWS {
  id: number;
  name: string;
  ReviewsDescription: string;
  starRating?: number;
  createdAt: string;
  posterImageUrl: ProductImages;
  ReviewsImages: ProductImages[];
  updatedAt?: string;
  reviewDate?: string;
}

//eslint-disable-next-line
export interface initiValuesProps extends Omit<IReview,
  'posterImageUrl' | 'createdAt',
  'updatedAt'
> {}

export interface RedirectUrls {
  updatedAt?: string;
  createdAt?: string;
  id: number;
  url: string;
  redirectedUrl: string;
}

export interface initialRedirectUrls extends Omit<RedirectUrls, 'id'> {
  redirectedUrl: string;
  url: string;
}

export interface MONTHLYGRAPH {
  series: { name: string; data: number[] }[];
  categories: string[];
}
export interface WEEKLYGRAPH {
  series: { name: string; data: number[] }[];
  categories: string[];
}
export interface STATUS {
  date: string;
  day: string;
  Appointments: number;
  Orders: number;
}

export interface IContactForm {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string | null;
  address: string;
  message?: string | null;
}
