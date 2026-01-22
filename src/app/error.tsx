'use client';
import React from 'react';
import ErrorPage from 'components/error-page';

export default function Error({ error }: { error: Error }) {
  return <ErrorPage error={error} />;
}
