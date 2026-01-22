type TFooterSection = {
  key: string;
  title: string;
  link: string;
  items: string[];
};

type TFooterLinkSection = {
  key: string;
  title: string;
  link: string;
  items?: string[];
  links: {
    text: string;
    href: string;
  }[];
};

export type TCategorySection = TFooterSection | TFooterLinkSection;
