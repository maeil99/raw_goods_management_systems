/* eslint-disable import/no-unresolved */
import type { NextPage } from 'next';
import CreateGoods from '../../components/views/create-goods';

const CreateGoodsLayout:NextPage = () => {
  const none = '';
  console.log(none);
  return (
    <CreateGoods />
  );
};

export default CreateGoodsLayout;
