import Projects from 'components/Projects/Projects';
import React from 'react';
import { generateMetadata } from 'utils/seoMetadata';
import { metaData } from 'data/meta-data';
import Breadcrumb from 'components/Res-usable/breadcrumb';
export const metadata = generateMetadata(metaData.projects);
const ProjectPage = () => {
  return (
    <>
      <Breadcrumb
        image="/assets/images/Projects/projects-banner.webp"
        title="Our Projects - Blinds and Curtains Dubai"
        bradcrumbtitle="Our Projects"
      />
      <Projects />
    </>
  );
};

export default ProjectPage;
