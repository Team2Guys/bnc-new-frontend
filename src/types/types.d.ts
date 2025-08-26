import React, { SetStateAction } from 'react';
import { CategoriesType } from './interfaces';
export type BRAND = {
  logo: string;
  name: string;
  visitors: number;
  revenues: string;
  sales: number;
  conversion: number;
};

export type PRODUCTBRANCH = {
  logo: string;
  name: string;
  price: number;
};

export interface listItems {
  listItem: any;
}

export interface PrivacyPolicyItem {
  title?: string;
  text?: any;
  listItems?: any[];
}

interface PosterImage {
  imageUrl: string;
  public_id: string;
  altText? :string
}

export interface ICategory {
  title: string;
  CategoryId: number;
  description: string | null;
  id: number;
  category: any;
  posterImage: PosterImage;
  bannerImage?: PosterImage;
  products: [];
  createdAt: Date;
  Meta_Title?: string;
  Canonical_Tag?: string;
  Meta_description?: string;
  last_editedBy?: string;
  breakcrum: string;
  topHeading?: string;

  headingchecks: any[]
  breakcrum?: string;

  productpageHeading?: string;
  faqHeadingS?: string;

  faqs: any[]
  faqHeading?:string
  status:Status
}

export interface Image {
  imageUrl: string;
  public_id: string;
  altText?:string;
  name?:string;
  pricing?:string
}


export interface POSTER_iMAGE extends Image{}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  posterImage: ProductImages;
  imageUrls: Image[];
  colorsImages?: Image[];
  CategoryId: number;
  SubCategoryId: number | null;
  createdAt: string;
  updatedAt: string | null;
  length?: any;
  href?: string;
  category?: any;
  product_type?: string;
  subCategory?: [];
  short_description?: string;
  heading?: string;
  colors?: Array<{name?: string;detail?: string;}> 
  Sub_Heading?: string;
  Sub_Heading_description?:string
  Meta_Title?: string;
  Canonical_Tag?: string;
  Meta_description?: string;
  subCategoryImage?: Image
  subcategory_description?:string
  modelDetails?:{name:string, detail:string}[]
  privarcyImage?:Image
  topImages?:Image
  status:Status
}

export interface ProductImages {
  altText?: string,
  imageUrl: string,
  public_id?: string,
  pricing?:string
  dimentions?:string
}

export interface IRECORDS {
  total_admins: string;
  total_categories: string;
  total_products: string;
  total_appointments: string;
  total_categorie: string;
  total_subCategories: string;
  total_Blogs: string;
}
export interface ISUBCATEGORY {
  title: string;
  description: string;
  short_description?: string;
  CategoryId: number | undefined;
  Meta_Title?: string;
  Meta_description?: string;
  Canonical_Tag?: string;
  Images_Alt_Text?: string;
}

export interface IAppointments {
  area: string;
  email: string;
  how_user_find_us: string;
  id: number;
  name: string;
  phone_number: string;
  prefered_Date: string; // Consider using Date type if parsing date is needed
  prefered_contact_method?: string;
  product_type?: string;
  user_query: string;
  whatsapp_number: string;
  windows: string;
  createdAt: string;
}

interface SubheadingContent {
  text?: string;
}

export interface ISelectedPage {
  heading?: string;
  paragraph?: string;
  src?: string;
  subheading1?: string;
  subheading2?: string;
  posterImage?: string;
  features?: SubheadingContent[];
}

export interface IInfo {
  selectedPage: ISelectedPage | null;
}

export interface MotorisedPageProps {
  title: string;
  heroImage?: any;
  infoTitle: string;
  infoSubtitle: string;
  infoDescription: string;
  infoImage?: any;
  measureTitle: string;
  measureDescription: string;
  chooseUsItems: { image: any; text: string }[];
  motorization: { text: string }[];
  additionalDescription?: string;
  additionalImage?: any;
  measureTitle1: string;
  measureDescription1: string;
  additionalDescription2: string;
  additionalDescription3: string;
  chooseustitle: string;
  chooseustitle1: string;
}


export interface CategoryProps {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  seteditCategory?: React.Dispatch<
    SetStateAction<CategoriesType | undefined | null>
  >;
  editCategory?: CategoriesType | undefined | null;
  subCategories?: ICategory[];
  categories?: ICategory[];
}

export interface ProductOptions {
  shutters?: boolean;
  curtains?: boolean;
  blinds?: boolean;
  roller_blinds?: boolean;
  wooden_blinds?: boolean;
  other_blinds?: boolean;
  shutters?: boolean;
  others?: boolean;
}


export interface ContactMethods {
  email: boolean;
  telephone: boolean;
  whatsapp: boolean;
}

export interface AppointmentProps {
  singlePage?: boolean;
  className?: string;
}
export interface PageData {
  heading: string;
  heading1: string;
  description: string;
  image: string;
  button1Text: string;
  button2Text: string;
  subheading: string;
  secondaryHeading: string;
  bulletPoints: string[];
  bulletPoints1: string[];
  para: string;
  para1: string;
}

export interface CommonSectionProps {
  data: PageData;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesCarouselProps {
  title: string;
  subtitle: string;
  features: Feature[];
  defaultVisibleItems?: number;
}
export interface Title {
  heading: string;
  id?:string;
  className?:string;
}
export interface Video {
  src: string;
}

interface VideoSectionProps {
  videos: Video[];
  heading?: string;
}
export interface Blind {
  id: number;
  name: string;
  image: string;
  category?: string;
  href?: string;
}

export interface Category {
  label: string;
  value: string;
}

export interface BlindsTabsProps {
  blindsData: Blind[];
  tabCategories: Category[];
}
export interface ExploreBlindsCurtainsProps {
  data: {
    title: string;
    description: string;
    image: string;
    viewlink: string;
    features: { icon: string; title: string; text: string,className?:string;}[];
    buttonLinks: { href: string; text: string }[];
    className?: string;
  };
  reverse?: boolean;
}
export interface WorkingProcessProps {
  data: { icon: string; title: string; description: string }[];
}

interface ServiceLocationsProps {
  title: string;
  description: string;
  locations: string[];
  mapLink: string;
}
interface BannerProps {
  imageSrc: string;
  paraText: string;
  linkHref: string;
  linkText: string;
  linkBgColor: string;
  className?: string;
}
export interface ExploreBlindsProps extends ExploreBlindsCurtainsProps {
  hideViewMore?: boolean;
  hidefeatures?: boolean;
  className?:string;
  buttonsClassName?:string,
}

export interface VideoPageProps {
  videoSrc: string;
  title: string;
  subtitle: string | any;
  description: string | any;
  width?: any;
  height?:any;
}
export interface relativeProps {
  products: IProduct[];
  categoriesList?: ICategory[];
  limit?: number;
  className?: string;
  title?: string;
  description?: string;
  bgcolor?: boolean;
  isPPc?:boolean
}
export interface ImageGalleryProps {
  images: ImageData[];
  columns?: number;
}

export interface Reel {
  videoUrl: string;
}
export interface StepItem {
  step: string;
  title: string;
   iconimage:string;
  description: string;
}

export interface WorkingProcessContent {
  heading: string;
 sliderImages:string[];
  subheading: string;
  videoUrl: string;
  steps: StepItem[];
}
export interface MBCFeature {
  icon: string;
  label: string;
}

export interface MotorizeBlindData {
  heading: string;
  videoUrl: string;
  buttons: { label: string; link: string }[];
  features: MBCFeature[];
}

export interface AboutUsBlock {
  shortHeading: string;
  shortHeadingSize?: string; 
  mainHeading: string;
  mainHeadingSize?: string;
  content: string;
  contentSize?: string;
  imageUrl: string;
}
export interface MilestoneStepItem {
  step: string;          
  description: string;    
  iconimage?: string;     
}

export interface MilestoneStepsData {
  heading: string;         
  subheading: string;       
  image: string;            
  steps: MilestoneStepItem[];  
}
export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}export interface ReviewData {
  name: string;
  review: string;
  reviewLink: string;
}

export interface ThankYouCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  iconKey: 'calendar' | 'map' | 'message';
  buttonLink: string;
}



export type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED"
