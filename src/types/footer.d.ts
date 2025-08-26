type TFooterSection = {
    key: string;
    title: string;
    items: string[];
  };
  
  type TFooterLinkSection = {
    key: string;
    title: string;
    items?: string[];
    links: {
      text: string;
      href: string;
    }[];
  };
  

  export type TCategorySection = TFooterSection | TFooterLinkSection;