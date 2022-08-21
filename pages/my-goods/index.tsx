/* eslint-disable import/no-unresolved */
import type { NextPage } from 'next';
import MyGoods from '../../components/views/my-goods';

const MyGoodsLayout:NextPage = () => {
  const none = '';
  console.log(none);
  return (
    <MyGoods />
  );
};

export default MyGoodsLayout;
