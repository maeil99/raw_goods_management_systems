import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { GoodsCard, Loader } from '../../index';
// eslint-disable-next-line import/no-unresolved
import { GoodsContext } from '../../../context/GoodsContext';
// eslint-disable-next-line import/no-unresolved
import { IFormattedGoods } from '../../../types/goods.interface';

const ListedGoods = () => {
  const { fetchMyGoodsOrListedGoods } = useContext(GoodsContext);
  const [goods, setGoods] = useState<IFormattedGoods[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!fetchMyGoodsOrListedGoods) return;
    fetchMyGoodsOrListedGoods('fetchItemsListed').then((items) => {
      setGoods(items);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex-start min-h-screen">
        <Loader />
      </div>
    );
  }
  if (!isLoading && goods.length === 0) {
    return (
      <div className="flexCenter sm:p-4 p-16 min-h-screen">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
          No Goods Listed for Sale
        </h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2">
            Goods Listed for Sale
          </h2>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {goods.map((good, i) => (
              <GoodsCard key={good.tokenId} goods={good} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedGoods;
