import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';
// eslint-disable-next-line import/no-unresolved
import { GoodsContext } from '../context/GoodsContext';
// eslint-disable-next-line import/no-unresolved

import { shortenAddress } from '../shared/utils/shortenAddress';
// eslint-disable-next-line import/no-unresolved
import { IFormattedGoods } from '../types/goods.interface';

interface IGoodsDetails extends IFormattedGoods {
  i?: number;
}

type GoodsCardProps = {
  goods: IGoodsDetails;
  index: number;
  // eslint-disable-next-line react/require-default-props
  onProfilePage?: boolean;
};

const GoodsCard = ({ goods, index, onProfilePage }: GoodsCardProps) => {
  const { goodsCurrency } = useContext(GoodsContext);
  const {
    owner,
    price,
    product,
    seller,
    tokenId,
    tokenURI,
    contact,
    goodsDetails,
  } = goods;
  const { chicken, meat, seafood, vegetable, fruit } = goodsDetails;
  // console.log('product from goods card: ', goods);
  return (
    <Link
      href={{
        pathname: '/goods-details',
        query: {
          tokenId,
          tokenURI,
          owner,
          seller,
          ...product,
          ...contact,
          ...chicken,
          ...meat,
          ...seafood,
          ...vegetable,
          ...fruit,
        },
      }}
    >
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={
              product.imageURI
              || images[`nft-goods-${index}` as keyof typeof images]
            }
            layout="fill"
            objectFit="cover"
            alt={`nft-goods-${index}`}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {product.name}
          </p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {price} <span className="normal">{goodsCurrency}</span>
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {shortenAddress(onProfilePage ? owner : seller)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GoodsCard;
