/* eslint-disable import/no-unresolved */
import type { NextPage } from 'next';
import { useTheme } from 'next-themes';
import Home from '../components/views/home';

const HomeLayout:NextPage = () => {
  const { theme } = useTheme();
  return (
    <Home theme={theme || ''} />
  );
};

export default HomeLayout;
