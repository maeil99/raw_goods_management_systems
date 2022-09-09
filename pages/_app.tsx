/* eslint-disable import/no-unresolved */
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import React from 'react';
import RgmsLayout from '../components/layout/RgmsLayout';
import { GoodsProvider } from '../context/GoodsContext';

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) => (
  <GoodsProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <RgmsLayout>
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
        </RgmsLayout>
      </div>
      <Script
        src="https://kit.fontawesome.com/04aa5e1825.js"
        crossOrigin="anonymous"
      />
    </ThemeProvider>
  </GoodsProvider>
);

export default MyApp;
