"use client";

import Container from "components/Res-usable/Container/Container";
import { workingProcessData } from "data/SellerSlider";
import Image from "next/image";
import Link from "next/link";

export default function SimpleSteps() {
  return (
    <div className="bg-secondary-foreground sm:bg-transparent pb-5 sm:pb-0">
    <Container className="mt-5 md:mt-10">
      <div className="mx-auto px-1 md:px-4">
        <div className="sm:py-7 pt-7 pb-0">
          <h2 className="sm:text-5xl text-2xl font-robotoSerif font-bold text-primary text-center">
            {workingProcessData.heading}
          </h2>
          <p className="sm:text-xl text-lg mt-3 sm:mt-6 mb-2 text-center font-roboto text-primary max-w-5xl mx-auto sm:block hidden">
            {workingProcessData.subheading}
          </p>
          <h3 className="sm:text-2xl text-xl sm:font-bold font-semibold text-primary mb-6 text-center font-robotoSerif block sm:hidden">
            Just <span className="text-[#F1B42F]">4</span> Simple Steps
          </h3>
        </div>

        <div className="flex sm:flex-row flex-col justify-center gap-8 items-center sm:bg-secondary-foreground">
          <div className="relative w-full h-[350px] md:h-[600px] sm:w-3/5">
            <video
              src={workingProcessData.videoUrl}
              className="w-full h-full object-cover "
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="w-full sm:sm:w-2/5">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center font-robotoSerif sm:block hidden">
              Just <span className="text-[#F1B42F]">4</span> Simple Steps
            </h3>
            <div>
              {workingProcessData.steps.map((step, idx) => (
                <div key={idx} className="flex items-start  gap-4 mt-1">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="rounded-full font-roboto bg-[#F1B42F1A] sm:p-2 sm:text-base text-12 text-[#F1B42F] border-2 border-[#F1B42F1A] font-semibold flex items-center justify-center min-w-[70px] min-h-[70px]">
                      {step.step}
                    </div>
                    <Image
                      src={step.iconimage}
                      alt="Working Process"
                      width={110}
                      height={110}
                      className={`w-auto h-8.5 ${idx === workingProcessData.steps.length - 1 ? "hidden" : ""
                        }`}
                    />

                  </div>
                  <div className="flex flex-col justify-center pt-3">
                    <p className="text-base font-bold text-primary font-robotoSerif">{step.title}</p>
                    <p className="text-base text-primary font-roboto">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/request-appointment" className="bg-secondary text-primary py-3 px-8 sm:px-16 block rounded-md w-fit font-semibold mt-10 mb-2 max-sm:mx-auto">Book A Free Visit</Link>
          </div>
        </div>
      </div>
    </Container>
    </div>

  );
}
