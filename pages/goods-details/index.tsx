/* eslint-disable import/no-unresolved */
import type { NextPage } from 'next';
import GoodsDetails from '../../components/views/goods-details';

const GoodsDetailsLayout:NextPage = () => {
  const none = '';
  console.log(none);
  return (
    <GoodsDetails />
  );
};

export default GoodsDetailsLayout;
