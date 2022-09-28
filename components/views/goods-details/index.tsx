import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
// eslint-disable-next-line import/no-unresolved
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-unresolved
import { shortenAddress } from '../../../shared/utils/shortenAddress';
// eslint-disable-next-line import/no-unresolved
import { GoodsContext, IBuyGoods } from '../../../context/GoodsContext';
import Loader from '../../Loader';

import images from '../../../assets';
// eslint-disable-next-line import/no-unresolved
import Button from '../../Button';
// eslint-disable-next-line import/no-unresolved
import Modal from '../../Modal';

interface IGoodsDetailsQueryProps {
  category: string;
  createdAt: string;
  deliveryMethod: string;
  deliveryPeriod: string;
  description: string;
  imageURI: string;
  name: string;
  owner: string;
  price: string;
  seller: string;
  tokenId: string;
  tokenURI: string;
  weight: string;
}

type PaymentBodyCmpProps = {
  goods: IGoodsDetailsQueryProps;
  goodsCurrency: string;
};

const PaymentBodyCmp = ({ goods, goodsCurrency }: PaymentBodyCmpProps) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        Item
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
        SubTotal
      </p>
    </div>
    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image src={goods.imageURI} layout="fill" objectFit="cover" />
        </div>
        <div className="flexCenterStart flex-col ml-5">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {shortenAddress(goods.seller)}
          </p>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {goods.name}
          </p>
        </div>
      </div>
      <div className="">
        <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
          {goods.price} <span className="font-semibold">{goodsCurrency}</span>
        </p>
      </div>
    </div>

    <div className="flexBetween mt-10">
      <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">
        Total
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
        {goods.price} <span className="font-semibold">{goodsCurrency}</span>
      </p>
    </div>
  </div>
);
const GoodsDetails = () => {
  const { currentAccount, goodsCurrency, buyGoods } = useContext(GoodsContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [goods, setGoods] = useState<IGoodsDetailsQueryProps>({
    category: '',
    createdAt: '',
    deliveryMethod: '',
    deliveryPeriod: '',
    description: '',
    imageURI: '',
    name: '',
    owner: '',
    price: '',
    seller: '',
    tokenId: '',
    tokenURI: '',
    weight: '',
  });
  const [buyGoodsQuery, setBuyGoodsQuery] = useState<IBuyGoods>();
  const router = useRouter();

  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;
    setGoods(router.query as unknown as IGoodsDetailsQueryProps);
    setIsLoading(false);
  }, [router.isReady]);
  if (isLoading) {
    return <Loader />;
  }

  console.log('goods: ', { goods });

  const checkout = async () => {
    setBuyGoodsQuery({ goodsPrice: goods.price, tokenId: goods.tokenId });
    if (!buyGoods || !buyGoodsQuery) return;
    await buyGoods(buyGoodsQuery);

    setPaymentModal(false);
    setSuccessModal(true);
  };

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 h-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300">
          <Image
            src={goods.imageURI}
            objectFit="cover"
            className="rounded-xl shadow-lg"
            layout="fill"
          />
        </div>
      </div>
      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {goods.name}
          </h2>
        </div>
        <div className="mt-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
            Creator
          </p>
          <div className="flex flex-row items-center mt-3 ">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={images.creator1}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
              {shortenAddress(goods.seller)}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-base font-medium mb-2">
              Details
            </p>
          </div>
          <div className="mt-3 ">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base  font-normal">
              {goods.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === goods.seller.toLowerCase() ? (
            <p className="font-poppins dark:text-white text-nft-black-1 text-base  font-normal border-gray p-2">
              You cannot buy your own Goods
            </p>
          ) : currentAccount === goods.owner.toLowerCase() ? (
            <Button
              btnType="button"
              btnName="List on Marketplaces"
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => router.push(
                `/resell-nft?tokenId=${goods.tokenId}&tokenURI=${goods.tokenURI}`,
              )}
            />
          ) : (
            <Button
              btnType="button"
              btnName={`Buy for ${goods.price} ${goodsCurrency}`}
              classStyles="mr-5 sm:mr-0 rounded-xl"
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>

      {paymentModal && (
        <Modal
          header="Check Out"
          body={<PaymentBodyCmp goods={goods} goodsCurrency={goodsCurrency} />}
          footer={(
            <div className="flex flex-row sm:flex-col">
              <Button
                btnType="button"
                btnName="Checkout"
                classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={checkout}
              />
              <Button
                btnType="button"
                btnName="Cancel"
                classStyles="rounded-xl"
                handleClick={() => setPaymentModal(false)}
              />
            </div>
          )}
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {successModal && (
        <Modal
          header="Payment Successful"
          body={(
            <div
              className="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <Image src={goods.imageURI} objectFit="cover" layout="fill" />
              </div>
              <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal mt-10">
                {' '}
                You successfully purchased{' '}
                <span className="font-semibold">{goods.name}</span> from{' '}
                <span className="font-semibold">
                  {shortenAddress(goods.seller)}
                </span>
                .
              </p>
            </div>
          )}
          footer={(
            <div className="flexCenter flex-col">
              <Button
                btnName="Check it out"
                btnType="button"
                classStyles="sm:mr-0 sm:mb-5 rounded-xl"
                handleClick={() => router.push('/my-nfts')}
              />
            </div>
          )}
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default GoodsDetails;
