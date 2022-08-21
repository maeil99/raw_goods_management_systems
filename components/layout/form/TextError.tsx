/* eslint-disable react/require-default-props */
import React from 'react';

interface IPageProps {
  children?: React.ReactNode;
}

const TextError = ({ children }: IPageProps) => (
  <div className="text-red-500 font-semibold py-2 flex w-full justify-end">
    {children}
  </div>
);

export default TextError;
