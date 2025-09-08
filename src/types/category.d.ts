import { Dispatch, SetStateAction } from "react";
import { ICategory, Status } from "./types";

export interface editCategoryNameType {
    name: string;
    description: string;
    Meta_Title?: string;
    Meta_description?: string;
    Canonical_Tag?: string;
    Images_Alt_Text?: string;
    topHeading?: string;
    headingchecks: any[]
    breakcrum?: string;
    productpageHeading?: string;
    faqHeadingS?: string;
    faqs: any[]
    faqHeading?: string;
    productCustomUrl?: string;
    categoryCustomUrl?: string;
    status: Status;
}

export interface editCategoryProps {
    seteditCategory: any;
    editCategory: any;
    setMenuType: Dispatch<SetStateAction<string>>;
    categoriesList?: ICategory[] | undefined;
}

export interface editSubCategoryNameType {
  title: string;
  description: string;
  short_description?: string;
  CategoryId: undefined;
  Meta_Title?: string;
  Meta_description?: string;
  Canonical_Tag?: string;
  Images_Alt_Text?: string;
  customUrl?:string
}