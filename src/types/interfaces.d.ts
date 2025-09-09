import React, { FormEventHandler, SetStateAction } from 'react';
import { ICategory, IProduct, Status } from './types';
import { VideoItem } from './product';
import Slider from 'react-slick';

React.FormEvent<HTMLFormElement>;
export interface USRPROPS {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  error: string | null | undefined;
  loading: boolean | null | undefined;
  inputFields: any;
  buttonTitle: string;
  title?: string;
  descrition?: string;
  InstructionText?: string;
  routingText?: string;
  navigationLink?: string;
  navigationTxt?: string;
  SelectComonent?: any;
  setadminType?: React.Dispatch<SetStateAction<string | undefined>>;
  adminType?: string | undefined;
}

export interface PRODUCTCARDPROPS {
  ImgUrl: string;
  title: string;
  strikThroughPrice: string;
  price: string;
}

export interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  colors: { colorName: string }[];
  totalStockQuantity: number;
  variantStockQuantities: { variant: string; quantity: number }[];
  modelDetails: { name: string; detail: string }[];
  spacification: { specsDetails: string }[];
  discountPrice: string;
  category: string;
  Images_Alt_Text?: string;
  Meta_Title?: string;
  Canonical_Tag?: string;
}

export interface Category {
  name?: string;
  description?: string;
  Meta_Title?: string;
  Meta_description?: string;
  Canonical_Tag?: string;
  Images_Alt_Text?: string;
  topHeading?: string;

  headingchecks: { specsDetails: string }[]
  breakcrum?: string;

  productpageHeading?: string;
  faqHeadingS?: string;

  faqs: { specsHeading: string ,specsDetails: string }[]
  faqHeading?: string
    
  productCustomUrl?: string
  categoryCustomUrl?: string
  title?: string
}

export interface CategoriesType extends Category {
  posterImageUrl: IMAGE_INTERFACE;
  createdAt: string;
  last_editedBy: string;
  id: string;
  posterImage?: postimage;
}
interface postimage {
  imageUrl: string;
}
interface CloudinaryImage {
  public_id: string | undefined;
  imageUrl: string | undefined;
  _id: string | undefined;
}

export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
}

interface Images {
  posterImageUrl: string | undefined;
  hoverImageUrl: string | undefined;
  imageUrl: CloudinaryImage[];
}

export interface ProductWithImages extends Product, Images { }

export interface FormValues {
  name: string;
  description: string;
  salePrice: string;
  purchasePrice: string;
  discountPrice: string;
  starRating: string;
  reviews: string;
  colors: { colorName: string }[];
  modelDetails: { name: string; detail: string }[];
  spacification: { specsDetails: string }[];
  sizes: string[];
  category: string;
  totalStockQuantity: number;
  variantStockQuantities: { variant: string; quantity: number }[];
  CategoryId?: number;
  SubCategoryId?: number;
  price: number;
  product_type: string;
  short_description?: string;
  heading?: string;
  Sub_Heading?: string;
  Sub_Heading_description?: string;
  Meta_Title?: string;
  Canonical_Tag?: string;
  Meta_description?: string;
  Images_Alt_Text?: string;
  subcategory_description?: string
}

interface Color {
  colorName?: string;
}
interface ModelDetail {
  name?: string;
  detail?: string;
}

interface Specification {
  specsDetails?: string;
}
interface sizes {
  sizesDetails?: string;
}

export default interface PRODUCTS_TYPES extends Product { }

export interface ADDPRODUCTFORMPROPS {
  setselecteMenu: any;
  EditInitialValues?: any | undefined;
  EditProductValue?: Product | undefined;
  setEditProduct?: any;
  categoriesList: ICategory[];
  subCategoriesList: ICategory[];
}

export interface Categories_Types {
  posterImageUrl: {
    public_id: string;
    imageUrl: string;
  };
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: any;
  last_editedBy: string;
  id: string;
  dataSource: string;
}

interface Image {
  imageUrl: string;
  public_id: string;
}

export interface Allproduct {
  id: number;
  title: string;
  description: string;
  price: number;
  posterImage: any;
  imageUrls: Image[];
  CategoryId: number;
  SubCategoryId: number | null;
  createdAt: string;
  updatedAt: string ;
  name?: any;
    status:Status
  
}

export interface CardTypes {
  image: string;
  heading: string;
  paragraph: string;
  buttonText: string;
}

export interface BlindsAndCurtainsTypes {
  image: string;
  heading: string;
  paragraph: string[];
  buttonText: string;
}

export interface SocialDataType {
  href: string;
  icon: any;
  alt: string;
}
export interface FeatureProductData {
  id: number;
  category: string;
  title: string;
  image: string;
  link: string;
}

export interface FooterLink {
  text: string;
  href: string;
}
export interface TFooterSection {
  title: string;
  links: FooterLink[];
}

export interface SupportItem {
  title: string;
  description: string;
}

export type BannerData = {
  imageUrl: string;
  title: string;
  buttonText: string;
};
export interface GalleryItems {
  id: number;
  imageUrl: string | any;
  title: string;
  category: string;
}

export interface ProductItems {
  id: number;
  imageUrl: string | any;
  title: string;
  discription: string;
  category: string;
}

export interface AboutStaticData {
  id: number;
  subheading: string;
  heading: string;
  paragraph: string;
}

export interface OurHistory {
  id: number;
  year: string;
  heading: string;
  discription: string;
}

export interface Tproductdata {
  title: string;
  heading: string;
  content: string;
  sideImage1: string;
  sideImage: string;
}

export interface TProductGuarantees {
  heading: string;
  text: string;
  image: string;
  imageAlign: 'left' | 'right';
}

export interface formDataTypes {
  fullname: string;
  email: string;
  password: string;
  canAddProduct: boolean;
  canEditProduct: boolean;
  canDeleteProduct: boolean;
  canAddCategory: boolean;
  canDeleteCategory: boolean;
  canEditCategory: boolean;
  canAddSubCategory: boolean;
  canDeleteSubCategory: boolean;
  canEditSubCategory: boolean;
  canViewAppointments: boolean;
  canVeiwAdmins: boolean;
  canVeiwTotalproducts: boolean;
  canVeiwTotalCategories: boolean;
  canVeiwTotalSubCategories: boolean;
  canAddBlog: boolean;
  canDeleteBlog: boolean;
  canEditBlog: boolean;
  id?: any;
}

export interface ADMINS_PROPS {
  setselecteMenu: React.Dispatch<SetStateAction<string | null | undefined>>;
  setedit_admins: React.Dispatch<SetStateAction<formDataTypes | undefined>>;
  adminsData: any[]
}

export interface createAdmin extends ADMINS_PROPS {
  setedit_admins?: React.Dispatch<SetStateAction<formDataTypes | undefined>>;
  edit_admins: formDataTypes | undefined;
  adminsData?: any[]
}

export interface BlogInfo {
  id?: number;
  posterImage: any;
  category: string;
  title: string;
  content: string;
  comment?: commentprops[];
  createdAt?: any;
  updatedAt?: any;
  last_editedBy?: string;
  Images_Alt_Text?: '';
  Canonical_Tag?: '';
  Meta_Title?: '';
  Meta_description?: '';
  isPublished?: boolean;
  redirectionUrl?: string;
}
interface commentprops {
  status?: string;
  title?: string;
  name?: string;
}
export interface UpdateBlog extends BlogInfo {
  id: string;
  Images_Alt_Text: '';
  Canonical_Tag: '';
  Meta_Title: '';
  Meta_description: '';
  redirectionUrl?: string;
}
export interface BlogProps {
  className?: string;
  Blogdata: BlogInfo[];
}
export interface CommentDataType {
  id: number;
  userName: string;
  comment: string;
  createdAt: any;
  replyId?: number;
}

export interface PhoneNumber {
  number: string;
}
export interface Email {
  email: string;
}

export interface ITopHeroLink {
  matchingTitle: string;
  title: string;
}

export interface IRollerBlinds {
  Category_id: number;
  sub_Category: string;
  Product: {
    product_name: string;
    altText: string;
    Imagesurl: string;
    desc?: string;
  }[];
}

export interface IColorData {
  id: number;
  url: string;
  color: string;
  name: string;
  imageUrls?: ColorData[];
}

interface ColorData {
  imageUrl: string;
  altText: string;
}

export type meta_props = {
  params: Promise<{ product: string }>;
};

export interface PRODUCS_PROPS {
  product?: string;
  filteredProduct: IProduct | undefined | null;
  filteredSubCategory?: ICategory | undefined | null;
  allprod?: Allproduct[];
  categories?: ICategory[]
  subCategories?: ICategory[]
  colorPage?: IColorData
  matchedSchema?: any;
}

export interface EsProduct {
  id?: number;
  title: string;
  description?: string;
  price?: number;
  posterImage?: any;
  imageUrls?: Image[];
  CategoryId?: number;
  SubCategoryId?: number | null;
  createdAt?: string;
  updatedAt?: string | null;
  length?: any;
  href?: string;
  category?: any;
  product_type?: string;
  subCategory?: [];
  short_description?: string;
  heading?: string;
  colors?: [
    {
      colorName?: string;
      colorCode?: string;
    },
  ];
  Sub_Heading?: string;
  Sub_Heading_description?: string;
  Meta_Title?: string;
  Canonical_Tag?: string;
  Meta_description?: string;
}

export interface EstimatorProps {
  selectProduct: EsProduct[];
  setActiveProduct: React.DispatchM<SetStateAction<EsProduct | null>>;
  activeProduct: EsProduct | null;
}



interface PosterImage {
  imageUrl: string;
}
export interface EstimatorProductTypes {
  id: number;
  title: string;
  posterImage: PosterImage;
  price: number;
}

interface CarouselProps {
  data: { title: string; description: string; icon: string }[];
}
interface ImageType {
  src: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  title?: string;
  images: ImageType[];
  columns?: number;
}
interface Feature {
  image: string;
  text: string;
  className?: string;
}
export interface WhyChooseUsProps {
  paragraph: string;
  features: Feature[];
  backgroundImage: string;
}

export interface ThumbnailProps {
  images?: { imageUrl: string; altText?: string; colorCode?: string }[];
  selectedColor?: string;
  setColorImage?: React.Dispatch<React.SetStateAction<string>>;
  videos: VideoItem[];
  videoThumbnail?: string;
  isMotorisedCategory: boolean
}

export interface SliderWithGoTo extends Slider {
  slickGoTo: (index: number, dontAnimate?: boolean) => void;
}

export interface ConfirmModalProps {
  title: string;
  content: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
}