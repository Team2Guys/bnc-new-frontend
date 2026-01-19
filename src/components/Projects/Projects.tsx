import React from 'react';
import ProjectCard from './ProjectCard';
import Container from 'components/Res-usable/Container/Container';

const Projects = () => {
  return (
    <Container className="px-4 my-10 space-y-2 sm:space-y-4">
      <h2 className='text-2xl lg:text-5xl font-semibold font-futura text-primary text-center'>Latest Projects</h2>
      <p className="text-base px-1 lg:px-8 text-primary text-center">
        No matter where you are in Dubai, our expertise is just a phone call away
      </p>
      <ProjectCard/>
    </Container>
  );
};

export default Projects;
