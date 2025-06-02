import { MotorizeBlindData, Reel, WorkingProcessContent } from "types/types";



export const reelsData: Reel[] = [
  {
    videoUrl:  "/videos/test1.mp4",
  },
  {
    videoUrl:  "/videos/test2.mp4",
  },
  {
    videoUrl:  "/videos/test3.mp4",
  },
  {
    videoUrl:  "/videos/test4.mp4",
  },
  {
    videoUrl:  "/videos/test5.mp4",
  },
  {
    videoUrl:  "/videos/test6.mp4",
  },
  {
    videoUrl:  "/videos/test7.mp4",
  },
  {
    videoUrl:  "/videos/test8.mp4",
  },
  {
    videoUrl:  "/videos/test9.mp4",
  },
  {
    videoUrl:  "/videos/test10.mp4",
  },
  {
    videoUrl:  "/videos/test11.mp4",
  },

];


// data/SellerSlider.ts
export const workingProcessData: WorkingProcessContent = {
  heading: "Our Working Process",
  subheading:
    "Hassle-free process from selection to installation. We make choosing and installing blinds and curtains effortless with our super-fast step-by-step process. ",
  sliderImages: [
    "/assets/images/Blinds/landing/Automatedblinds.webp",
    "/assets/images/Blinds/landing/Automatedblinds.webp",
    "/assets/images/Blinds/landing/Automatedblinds.webp",
  ],
  videoUrl: "https://bncmain.s3.eu-north-1.amazonaws.com/New+Latest+Bnc+Step+By+Step+Process+With+Text(1).mp4",
  steps: [
    {
      step: "Step 1",
      iconimage: "/assets/images/Line-380.svg",
      title: "Book a Free Appointment",
      description: "You can easily book online or call us.",
    },
    {
      step: "Step 2",
      iconimage: "/assets/images/Line-380.svg",
      title: "Measurements & Selection",
      description: "Our experts will visit with samples and take precise measurements.",
    },
    {
      step: "Step 3",
      iconimage: "/assets/images/Line-380.svg",
      title: "In-house production",
      description: "Every stitch is made by our own hands, not outsourced.",
    },
    {
      step: "Step 4",
      iconimage: "/assets/images/Line-380.svg",
      title: "Delivery & Installation",
      description: "Professional installation by our own dedicated staff.",
    },
  ],
};

// data.ts

export const motorizeBlindData: MotorizeBlindData = {
  heading: "Motorised Blinds and Curtains for a Smart Home!",
  videoUrl: "/videos/sunset.mp4", 
  buttons: [
    { label: "View Motorised Blinds", link: "/blinds/motorised-blinds/" },
    { label: "View Motorised Curtains", link: "/curtains/motorised-curtains/" },
  ],
  features: [
    {
      icon: "/assets/images/feature/smarcontrol.png",
      label: "Smart Control",
    },
    {
      icon: "/assets/images/feature/smartphone.png",
      label: "Smartphone",
    },
    {
    icon: "/assets/images/feature/voiceassistant.png",
      label: "Voice Assistant",
    },
    {
    icon: "/assets/images/feature/remotecontrol.png",
      label: "Remote Control",
    },
    {
      icon: "/assets/images/feature/automated.png",
      label: "Automated Scheduling",
    },
  ],
};
