/* eslint-disable import/no-unresolved */
import React from 'react';
import { Navbar, Footer } from '../index';

interface IPageProps{
    children: React.ReactNode;
}

const RgmsLayout = ({ children }:IPageProps) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default RgmsLayout;
