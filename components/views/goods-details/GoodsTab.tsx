import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { IContactDetailsProps } from '../../../types/contact.interface';
// eslint-disable-next-line import/no-unresolved
import BareButton from '../../BareButton';

export interface IGeneralInfo {
  weight: string;
  description: string;
  category: string;
  deliveryMethod: string;
  deliveryPeriod: string;
  createdAt: string;
}

interface IGoodsTabProps {
  generalInfo: IGeneralInfo;
  contactInfo: IContactDetailsProps;
}

const GoodsTab = (productInfo: IGoodsTabProps) => {
  const { generalInfo, contactInfo } = productInfo;
  const [currentTab, setCurrentTab] = useState<string>('general');
  console.log('general info: ', generalInfo);
  console.log('contact info: ', contactInfo);
  const generateTab = (i: string) => {
    switch (i) {
      case 'general':
        setCurrentTab('general');
        break;
      case 'contact':
        setCurrentTab('contact');
        break;
      case 'product':
        setCurrentTab('product');
        break;
      default:
        setCurrentTab('general');
        break;
    }
  };
  const createdAt = new Date(generalInfo.createdAt);
  console.log({ currentTab });

  return (
    <>
      <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row pb-1">
        <BareButton
          btnName="General Info"
          btnType="button"
          handleClick={() => generateTab('general')}
        />
        <BareButton
          btnName="Contact Info"
          btnType="button"
          handleClick={() => generateTab('contact')}
        />
        <BareButton
          btnName="Goods Details"
          btnType="button"
          handleClick={() => generateTab('product')}
        />
      </div>
      {currentTab === 'general' && generalInfo && (
        <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
          <div className="flex flex-col space-y-2 pb-2">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Description:
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Category:
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Weight:
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Delivery Method:
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Delivery Period:
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Created on:
            </p>
          </div>
          <div className="flex flex-col space-y-2 pb-2">
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {generalInfo.description}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {generalInfo.category}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {generalInfo.weight}
              {' KG'}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {generalInfo.deliveryMethod}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {generalInfo.deliveryPeriod}
              {' Working Days'}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {createdAt.toString()}
            </p>
          </div>
        </div>
      )}
      {currentTab === 'contact' && contactInfo && (
        <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
          <div className="flex flex-col space-y-2 pb-2">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Name:
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Address:
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Email:
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
              Mode of Contact:
            </p>
            {contactInfo.contactMOC === 'telephonemoc' && (
              <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
                Telephone No.:
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2 pb-2">
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {contactInfo.contactName}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {contactInfo.contactAddress}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {contactInfo.contactEmail}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
              {contactInfo.contactMOC}
            </p>
            {contactInfo.contactMOC === 'telephonemoc' && (
              <p className="font-poppins dark:text-white text-nft-black-1 font-normal">
                telephone
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GoodsTab;
