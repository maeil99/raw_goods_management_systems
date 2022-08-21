/* eslint-disable import/no-unresolved */
import type { NextPage } from 'next';
import ListedGoods from '../../components/views/create-goods';

const ListedGoodsLayout:NextPage = () => {
  const none = '';
  console.log(none);
  return (
    <ListedGoods />
  );
};

export default ListedGoodsLayout;
