import React from 'react';
import EstimatorPage from './Estimator';
import { estimatorprod } from 'data/estimator';
import { metaData } from 'data/meta-data';
import { generateMetadata } from 'utils/seoMetadata';
export const metadata = generateMetadata(metaData.estimator);
const Estimator = async () => {
  return (
    <EstimatorPage sortedProducts={estimatorprod}  />
  );
};

export default Estimator;
