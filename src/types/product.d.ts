import React from "react";
import { ICategory, IProduct } from "./types";

export interface BreadcrumbProps  {
    title?: string;
    image?: string;
    slug?: string;
    subcategory?: string;
  }
 export interface CategoryProps {
  Data?: ICategory;
  Products?: IProduct[];
  title?: string;
}

interface AccordionItem {
  specsHeading?: string;
  specsDetails?: string;
}

export interface AccordionProps {
  items?: AccordionItem[];
}
export interface VideoItem {
  imageUrl?: string
  public_id?: string
}

export interface DetailProps {
  data: IProduct;
  selectedColor: string;
  setColorImage: React.Dispatch<React.SetStateAction<string>>;
}

type TabDataItem = {
  icon: string;
  title: string;
  heading: string;
  description: string;
  href: string;
  buttonText: string;
  image: string;
};

export interface InfoTabsProps {
  tabData: TabDataItem[];
  isHome?: boolean;
  isCurtainsCategory?: boolean
}
