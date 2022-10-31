/* eslint-disable import/no-unresolved */
import { NextPage } from 'next';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Loader, Button, Input } from '../../index';
import { GoodsContext } from '../../../context/GoodsContext';
import { IFetchGoodsProps } from '../../../types/goods.interface';

const ResellGoods:NextPage = () => {
  const { createSale } = useContext(GoodsContext);
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isLoadingGoods, setIsLoadingGoods] = useState<boolean>(true);

  const fetchGoods = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get<IFetchGoodsProps>(tokenURI as string);
    const { product } = data;

    setImage(product.imageURI);
    setPrice(product.price.toString());
    setIsLoadingGoods(false);
  };

  useEffect(() => {
    if (tokenURI) fetchGoods();
  }, [tokenURI]);

  if (isLoadingGoods) {
    return (
      <div className="flex-start min-h-screen">
        <Loader />
      </div>
    );
  }

  const resell = async () => {
    if (!createSale) return;
    await createSale(tokenURI as string, price, tokenId as string, true);
    router.push('/');
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Resell NFT</h1>
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice((e.target as HTMLInputElement).value)}
        />

        {image && <img src={image} className="rounded mt-4" width={350} />}

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnType="button"
            btnName="List Goods"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellGoods;
