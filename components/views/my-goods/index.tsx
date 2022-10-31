/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

import { Banner, Loader, GoodsCard, SearchBar } from '../../index';
import images from '../../../assets';
import { shortenAddress } from '../../../shared/utils/shortenAddress';
import { GoodsContext } from '../../../context/GoodsContext';
import { IFormattedGoods } from '../../../types/goods.interface';
import { ActiveSelectOption } from '../../SearchBar';

const MyGoods = () => {
  const { fetchMyGoodsOrListedGoods, currentAccount } = useContext(GoodsContext);
  const [goods, setGoods] = useState<IFormattedGoods[]>([]);
  const [goodsCopy, setGoodsCopy] = useState<IFormattedGoods[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSelect, setActiveSelect] = useState<ActiveSelectOption>('Recently added');

  useEffect(() => {
    if (!fetchMyGoodsOrListedGoods) return;
    fetchMyGoodsOrListedGoods('fetchMyNFTs').then((items) => {
      setGoods(items);
      setGoodsCopy(items);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const sortedGoods = [...goods];

    switch (activeSelect) {
      case 'Price(low to high)':
        setGoods(
          sortedGoods.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)),
        );
        break;
      case 'Price(high to low)':
        setGoods(
          sortedGoods.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)),
        );
        break;
      case 'Recently added':
        setGoods(sortedGoods.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setGoods(goods);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value: string) => {
    const filteredNFTs = goods.filter(({ product }) => product.name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNFTs.length) {
      setGoods(filteredNFTs);
    } else {
      setGoods(goodsCopy);
    }
  };

  const onClearSearch = () => {
    if (goods.length && goodsCopy.length) {
      setGoods(goodsCopy);
    }
  };
  return (
    <>
      {isLoading && (
        <div className="flexStart min-h-screen">
          <Loader />
        </div>
      )}
      <div className="w-full flex justify-start items-center flex-col min-h-screen">
        <div className="w-full flexCenter flex-col">
          <Banner
            banner="Your Nifty NFTs"
            childStyles="text-center mb-4"
            parentStyles="h-80 justify-center"
          />
          <div className="flexCenter flex-col -mt-20 z-0 ">
            <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
              <Image
                src={images.creator1}
                alt="images"
                className="rounded-full object-cover"
                objectFit="cover"
              />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
              {shortenAddress(currentAccount)}
            </p>
          </div>
        </div>
        {!isLoading && !goods.length && !goodsCopy.length ? (
          <div className="flexCenter sm:p-4 p-16">
            <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
              No Goods Owned
            </h1>
          </div>
        ) : (
          <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
            <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8 ">
              <SearchBar
                activeSelect={activeSelect}
                setActiveSelect={setActiveSelect}
                handleSearch={onHandleSearch}
                clearSearch={onClearSearch}
              />
            </div>
            <div className="mt-3 w-full flex flex-wrap">
              {goods.map((things, i) => (
                <GoodsCard
                  key={things.tokenId}
                  goods={things}
                  index={i}
                  onProfilePage
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyGoods;
