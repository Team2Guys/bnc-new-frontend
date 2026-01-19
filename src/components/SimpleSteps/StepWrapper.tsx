"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import SimpleStepsSkeleton from "./SimpleStepsSkeleton";

const SimpleSteps = dynamic(() => import("./SimpleSteps"), {
  loading: () => <SimpleStepsSkeleton />,
});

const StepWrapper = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView) setShow(true);
  }, [inView]);

  return (
    <div ref={ref}>
      {show ? <SimpleSteps /> : <SimpleStepsSkeleton />}
    </div>
  );
};

export default StepWrapper;
