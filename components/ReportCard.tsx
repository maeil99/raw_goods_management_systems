/* eslint-disable import/no-unresolved */
/* eslint-disable react/require-default-props */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MiniChevronDownIcon from '../assets/icons/MiniChevronDownIcon';
import { IFormattedGoods } from '../types/goods.interface';

interface IGoodsDetails extends IFormattedGoods {
  i?: number;
}
type IReportCardProps = {
  seller: string;
  reportedCases: number;
  className?: string;
  children?: React.ReactNode;
  filteredGoods?: IGoodsDetails;
};

const ReportCard = ({
  children,
  className,
  seller: originSeller,
  reportedCases,
  filteredGoods,
}: IReportCardProps) => {
  const [toggleCard, setToggleCard] = useState(false);
  const [prodDetails, setProdDetails] = useState<IGoodsDetails>({
    price: '',
    tokenId: 0,
    seller: '',
    owner: '',
    tokenURI: null,
    product: {
      name: '',
      category: 'chicken',
      price: 0,
      description: '',
      weight: 0,
      deliveryMethod: '',
      deliveryPeriod: 0,
      imageURI: '',
      createdAt: '',
    },
    contact: {
      contactName: '',
      contactAddress: '',
      contactEmail: '',
      contactMOC: '',
      contactPhoneNo: '',
    },
    goodsDetails: {},
  });

  useEffect(() => {
    if (filteredGoods) {
      setProdDetails(filteredGoods);
    }
  }, []);
  //   console.log('filtered Goods: ', filteredGoods);

  const { owner, product, seller, tokenId, tokenURI, contact, goodsDetails } = prodDetails;
  const { chicken, meat, seafood, vegetable, fruit } = goodsDetails;
  return (
    <div
      className={`${className} bg-white dark:bg-nft-black-1 border border-gray-400 rounded-xl divide-y divide-solid sm:px-3 px-6 shadow-md`}
    >
      <div className="flex justify-between sm:mb-2 mb-4 sm:pt-3 pt-6 sm:text-sm text-lg sm:font-semibold font-bold">
        <p>{originSeller}</p>
        <div className="flex space-x-2">
          <div className="bg-red-500 py-2 rounded-lg px-2 text-white  sm:shadow-sm shadow-lg">
            <p>
              {`${reportedCases} ${
                reportedCases === 1 ? 'case' : 'cases'
              } reported`}
            </p>
          </div>

          <div onClick={() => setToggleCard(!toggleCard)}>
            <MiniChevronDownIcon
              className={`text-gray-400 sm:w-3 w-6 sm:h-3 h-6 transform transition duration-200 ${
                toggleCard ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
        </div>
      </div>
      <div className={`${toggleCard ? '' : 'hidden '}`}>
        <div className="flex flex-col divide-y divide-solid">{children}</div>
        {prodDetails && prodDetails.seller === originSeller && (
          <div className="flex justify-end sm:text-sm text-lg sm:font-medium font-semibold dark:text-nft-black-1 text-white px-2 pb-4">
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
              <div className="border p-4 rounded-lg bg-blue-400 shadow-md hover:shadow-xl hover:cursor-pointer">
                View Product
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
