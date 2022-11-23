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
// eslint-disable-next-line import/no-unresolved
import GoodsTab, { IGeneralInfo } from './GoodsTab';
// eslint-disable-next-line import/no-unresolved
import { IContactDetailsProps } from '../../../types/contact.interface';
// eslint-disable-next-line import/no-unresolved
import {
  IGoodsDetailsProps,
  IGoodsDetailsQueryProps,
  // eslint-disable-next-line import/no-unresolved
} from '../../../types/goods.interface';

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
    contactName: '',
    contactAddress: '',
    contactEmail: '',
    contactMOC: '',
  });
  const {
    description,
    imageURI,
    name,
    owner,
    price,
    seller,
    tokenId,
    tokenURI,
    weight,
    category,
    createdAt,
    deliveryMethod,
    deliveryPeriod,
    contactName,
    contactAddress,
    contactEmail,
    contactMOC,
    contactPhoneNo,
    // chicken
    chickenType,
    isChickenHormone,
    // meat
    meatType,
    isMeatImported,
    isMeatHormone,
    meatImportedCountry,

    // seafood
    seafoodTypes,
    typeOfFish,
    isFishClean,
    isFishFresh,
    isFishHavePreservation,
    typeOfCrustacea,
    typeOfMollusca,

    // vegetable
    isVegImported,
    isVegUseFertilizer,
    isVegUsePesticide,
    vegFertilizerType,
    vegImportedCountry,
    vegType,

    // fruit
    fruitImportedCountry,
    fruitType,
    isFruitFertilize,
    isFruitImported,
    isFruitUsePesticide,
    isFruitUseWax,
    whereFruitPlanted,
  } = goods;
  const generalInfo: IGeneralInfo = {
    description,
    category,
    weight,
    deliveryMethod,
    deliveryPeriod,
    createdAt,
  };
  const contactInfo: IContactDetailsProps = {
    contactName,
    contactAddress,
    contactEmail,
    contactMOC,
    contactPhoneNo,
  };

  const goodsDetails: IGoodsDetailsProps = {
    chicken: {
      chickenType: chickenType || '',
      isChickenHormone: isChickenHormone || '',
    },
    meat: {
      meatType: meatType || '',
      isMeatImported: isMeatImported || '',
      isMeatHormone: isMeatHormone || '',
      meatImportedCountry: meatImportedCountry || '',
    },
    seafood: {
      seafoodTypes: seafoodTypes || '',
      typeOfFish: typeOfFish || '',
      isFishClean: isFishClean || '',
      isFishFresh: isFishFresh || '',
      isFishHavePreservation: isFishHavePreservation || '',
      typeOfCrustacea: typeOfCrustacea || '',
      typeOfMollusca: typeOfMollusca || '',
    },
    vegetable: {
      vegType: vegType || '',
      isVegUseFertilizer: isVegUseFertilizer || '',
      vegFertilizerType: vegFertilizerType || '',
      isVegImported: isVegImported || '',
      vegImportedCountry: vegImportedCountry || '',
      isVegUsePesticide: isVegUsePesticide || '',
    },
    fruit: {
      fruitType: fruitType || '',
      isFruitFertilize: isFruitFertilize || '',
      isFruitImported: isFruitImported || '',
      fruitImportedCountry: fruitImportedCountry || '',
      whereFruitPlanted: whereFruitPlanted || '',
      isFruitUsePesticide: isFruitUsePesticide || '',
      isFruitUseWax: isFruitUseWax || '',
    },
  };
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

  // console.log('goods: ', { goods });

  const checkout = async () => {
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
            src={imageURI}
            objectFit="cover"
            className="rounded-xl shadow-lg"
            layout="fill"
          />
        </div>
      </div>
      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {name}
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
              {shortenAddress(seller)}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <GoodsTab
            generalInfo={generalInfo}
            contactInfo={contactInfo}
            goodsDetails={goodsDetails}
            tokenURI={goods.tokenURI}
            seller={goods.seller}
            tokenId={goods.tokenId}
            currentAccount={currentAccount}
          />
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === seller.toLowerCase() ? (
            <p className="font-poppins dark:text-white text-nft-black-1 text-base  font-normal border-gray p-2">
              You cannot buy your own goods
            </p>
          ) : currentAccount === owner.toLowerCase() ? (
            <Button
              btnType="button"
              btnName="List on Marketplaces"
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => router.push(
                `/resell-goods?tokenId=${tokenId}&tokenURI=${tokenURI}`,
              )}
              useDefaultTheme
            />
          ) : (
            <Button
              btnType="button"
              btnName={`Buy for ${price} ${goodsCurrency}`}
              classStyles="mr-5 sm:mr-0 rounded-xl"
              handleClick={() => {
                setBuyGoodsQuery({
                  goodsPrice: goods.price,
                  tokenId: goods.tokenId,
                });
                setPaymentModal(true);
              }}
              useDefaultTheme
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
                useDefaultTheme
              />
              <Button
                btnType="button"
                btnName="Cancel"
                classStyles="rounded-xl"
                handleClick={() => setPaymentModal(false)}
                useDefaultTheme
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
                handleClick={() => router.push('/my-goods')}
                useDefaultTheme
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
