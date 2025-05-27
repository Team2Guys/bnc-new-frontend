import { ProductImage } from "./prod";



export interface IREVIEWS {
  id: number;
  name: string;
  ReviewsDescription: string
  starRating?: number
  createdAt: string;
  posterImageUrl: ProductImage
  ReviewsImages: ProductImage[]
  updatedAt?: string
  reviewDate?: string
}

//eslint-disable-next-line
export interface initiValuesProps extends Omit<IReview, "posterImageUrl" | "createdAt", "updatedAt"> { }


export interface RedirectUrls {
  updatedAt?: string
  createdAt?: string;
  id: number,
  url: string,
  redirectedUrl: string
}


export interface initialRedirectUrls extends Omit<RedirectUrls, "id" > {
  redirectedUrl: string
  url: string,
}
