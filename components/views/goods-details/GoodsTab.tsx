import { useRouter } from 'next/router';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { useCollection } from '../../../shared/firebaseHooks/useCollection';
// eslint-disable-next-line import/no-unresolved
import removeUnderscore from '../../../shared/utils/removeUnderscore';
// eslint-disable-next-line import/no-unresolved
import { IContactDetailsProps } from '../../../types/contact.interface';
// eslint-disable-next-line import/no-unresolved
import { IGoodsDetailsProps } from '../../../types/goods.interface';
// eslint-disable-next-line import/no-unresolved
import BareButton from '../../BareButton';
// eslint-disable-next-line import/no-unresolved
import Button from '../../Button';

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
  goodsDetails: IGoodsDetailsProps;
  tokenURI: string;
  tokenId: string;
  seller: string;
  currentAccount: string;

}

const GoodsTab = (productInfo: IGoodsTabProps) => {
  const {
    generalInfo,
    contactInfo,
    goodsDetails,
    seller,
    tokenURI,
    tokenId,
    currentAccount,
  } = productInfo;
  console.log('current acc: ', currentAccount);
  console.log('seller: ', seller);
  const [currentTab, setCurrentTab] = useState<string>('general');
  const listOfReport = useCollection({ databaseCollection: 'report' });
  const reportedProduct = listOfReport
    && listOfReport.documents?.find(
      (prod) => prod.seller === seller && prod.tokenId === tokenId,
    );
  // console.log('report prod: ', reportedProduct);
  // console.log('general info: ', generalInfo);
  // console.log('contact info: ', contactInfo);
  // console.log('goods details: ', goodsDetails);
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
      case 'report':
        setCurrentTab('report');
        break;
      default:
        setCurrentTab('general');
        break;
    }
  };
  const createdAt = new Date(generalInfo.createdAt);
  // console.log({ currentTab });
  const router = useRouter();

  return (
    <>
      <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row pb-2 justify-between">
        <div>
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
          {reportedProduct && (
            <BareButton
              btnName="Reported Case"
              btnType="button"
              handleClick={() => generateTab('report')}
            />
          )}
          {currentAccount !== seller.toLowerCase() && (
            <Button
              btnName="Report This Product"
              btnType="button"
              handleClick={() => router.push(
                `/report-a-seller?tokenURI=${tokenURI}&seller=${seller}&tokenId=${tokenId}`,
              )}
              classStyles="rounded-xl mx-2 bg-red-500 hover:shadow-lg"
            />
          )}
        </div>
      </div>
      {currentTab === 'general' && generalInfo && (
        <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
          <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-semibold">
            <p>Description:</p>
            <p>Category:</p>
            <p>Weight:</p>
            <p>Delivery Method:</p>
            <p>Delivery Period:</p>
            <p>Created on:</p>
          </div>
          <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-normal">
            <p>{generalInfo.description || ''}</p>
            <p>{generalInfo.category || ''}</p>
            <p>
              {generalInfo.weight || ''}
              {' KG'}
            </p>
            <p>{generalInfo.deliveryMethod || ''}</p>
            <p>
              {generalInfo.deliveryPeriod
                ? `${generalInfo.deliveryPeriod} working days`
                : 'NA'}
            </p>
            <p>{createdAt.toString()}</p>
          </div>
        </div>
      )}
      {currentTab === 'contact' && contactInfo && (
        <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
          <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-semibold">
            <p>Name:</p>
            <p>Address:</p>
            <p>Email:</p>
            <p>Mode of Contact:</p>
            {contactInfo.contactMOC === 'telephonemoc' && <p>Telephone No.:</p>}
          </div>
          <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-normal">
            <p>{contactInfo.contactName || 'NA'}</p>
            <p>{contactInfo.contactAddress || 'NA'}</p>
            <p>{contactInfo.contactEmail || 'NA'}</p>
            <p>
              {contactInfo.contactMOC === 'telephonemoc'
                ? 'Telephone'
                : 'Email'}
            </p>
            <p>
              {contactInfo.contactMOC === 'telephonemoc'
                ? contactInfo.contactPhoneNo
                : ''}
            </p>
          </div>
        </div>
      )}
      {currentTab === 'product'
        && goodsDetails
        && goodsDetails.chicken?.chickenType !== '' && (
          <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-semibold">
              <p>Chicken part:</p>
              <p>Is the chicken already hormone:</p>
            </div>

            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-normal">
              <p>
                {goodsDetails.chicken?.chickenType
                  ? goodsDetails.chicken.chickenType
                  : 'NA'}
              </p>
              <p>
                {goodsDetails.chicken?.isChickenHormone === 'true'
                  ? 'yes'
                  : 'no'}
              </p>
            </div>
          </div>
      )}
      {currentTab === 'product'
        && goodsDetails
        && goodsDetails.meat?.meatType !== '' && (
          <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-semibold">
              <p>Meat type:</p>
              <p>Is the meat already hormone:</p>
              <p>Is the meat imported:</p>
              {goodsDetails.meat?.isMeatImported === 'true' && (
                <p>Imported country&apos;s name:</p>
              )}
            </div>

            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-normal">
              <p>
                {goodsDetails.meat?.meatType
                  ? goodsDetails.meat?.meatType
                  : 'NA'}
              </p>
              <p>
                {goodsDetails.meat?.isMeatHormone === 'true' ? 'yes' : 'no'}
              </p>
              <p>
                {goodsDetails.meat?.isMeatImported === 'true' ? 'yes' : 'no'}
                {goodsDetails.meat?.isMeatImported === 'true' && (
                  <p>{goodsDetails.meat?.meatImportedCountry}</p>
                )}
              </p>
            </div>
          </div>
      )}
      {currentTab === 'product'
        && goodsDetails
        && goodsDetails.seafood?.seafoodTypes !== '' && (
          <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-semibold">
              <p>Type of seafood:</p>
              {goodsDetails.seafood?.seafoodTypes === 'fish' && (
                <>
                  <p>Type of fish:</p>
                  <p>Fish farm / Fresh catch:</p>
                  <p>Is fish already clean:</p>
                  <p>Is the used preservation:</p>
                </>
              )}
              {goodsDetails.seafood?.seafoodTypes === 'mollusca' && (
                <p>Type of mollusca:</p>
              )}
              {goodsDetails.seafood?.seafoodTypes === 'crustacea' && (
                <p>Type of crustacea:</p>
              )}
            </div>

            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-normal">
              <p>{goodsDetails.seafood?.seafoodTypes || 'NA'}</p>
              {goodsDetails.seafood?.seafoodTypes === 'fish' && (
                <>
                  <p>
                    {removeUnderscore(goodsDetails.seafood?.typeOfFish) || 'NA'}
                  </p>
                  <p>
                    {removeUnderscore(goodsDetails.seafood?.isFishFresh)
                      || 'NA'}
                  </p>
                  <p>
                    {goodsDetails.seafood?.isFishClean === 'true'
                      ? 'yes'
                      : 'no' || 'NA'}
                  </p>
                  <p>
                    {goodsDetails.seafood?.isFishHavePreservation === 'true'
                      ? 'yes'
                      : 'no' || 'NA'}
                  </p>
                </>
              )}
              {goodsDetails.seafood?.seafoodTypes === 'mollusca' && (
                <p>{goodsDetails.seafood?.typeOfMollusca}</p>
              )}
              {goodsDetails.seafood?.seafoodTypes === 'crustacea' && (
                <p>{goodsDetails.seafood?.typeOfCrustacea}</p>
              )}
            </div>
          </div>
      )}
      {currentTab === 'product'
        && goodsDetails
        && goodsDetails.vegetable?.vegType !== '' && (
          <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-semibold">
              <p>Vegetable type:</p>
              <p>Is the vegetable used fertilizer:</p>
              {goodsDetails.vegetable?.isVegUseFertilizer !== ''
                && goodsDetails.vegetable?.isVegUseFertilizer === 'true' && (
                  <p>Fertilizer type:</p>
              )}
              <p>Is the vegetable imported:</p>
              {goodsDetails.vegetable?.isVegImported !== ''
                && goodsDetails.vegetable?.isVegImported === 'true' && (
                  <p>Imported country&apos;s name:</p>
              )}
              <p>Is the vegetable used any pesticides:</p>
            </div>

            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-normal">
              <p>{removeUnderscore(goodsDetails.vegetable?.vegType) || 'NA'}</p>
              <p>
                {goodsDetails.vegetable?.isVegUseFertilizer === 'true'
                  ? 'yes'
                  : 'no'}
              </p>
              {goodsDetails.vegetable?.isVegUseFertilizer !== ''
                && goodsDetails.vegetable?.isVegUseFertilizer === 'true' && (
                  <p>{goodsDetails.vegetable?.vegFertilizerType || 'NA'}</p>
              )}
              <p>
                {goodsDetails.vegetable?.isVegImported === 'true'
                  ? 'yes'
                  : 'no'}
              </p>
              {goodsDetails.vegetable?.isVegImported !== ''
                && goodsDetails.vegetable?.isVegImported === 'true' && (
                  <p>{goodsDetails.vegetable?.vegImportedCountry || 'NA'}</p>
              )}
              <p>
                {goodsDetails.vegetable?.isVegUsePesticide === 'true'
                  ? 'yes'
                  : 'no'}
              </p>
            </div>
          </div>
      )}
      {currentTab === 'product'
        && goodsDetails
        && goodsDetails.fruit?.fruitType !== '' && (
          <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-semibold">
              <p>Fruit type:</p>
              <p>Is the fruit used fertilizer:</p>
              <p>Is the fruit imported:</p>
              {goodsDetails.fruit?.isFruitImported !== ''
                && goodsDetails.fruit?.isFruitImported === 'true' && (
                  <p>Imported country&apos;s name:</p>
              )}
              <p>Fruit plant location:</p>
              <p>Is the fruit use any pesticides:</p>
              <p>Is the fruit use any wax:</p>
            </div>

            <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-normal">
              <p>{goodsDetails.fruit?.fruitType || 'NA'}</p>
              <p>
                {goodsDetails.fruit?.isFruitFertilize === 'true'
                  ? 'yes'
                  : 'no' || 'NA'}
              </p>
              <p>{goodsDetails.fruit?.isFruitImported || 'NA'}</p>
              {goodsDetails.fruit?.isFruitImported !== ''
                && goodsDetails.fruit?.isFruitImported === 'true' && (
                  <p>{goodsDetails.fruit?.fruitImportedCountry || 'NA'}</p>
              )}
              <p>{goodsDetails.fruit?.whereFruitPlanted || 'NA'}</p>
              <p>
                {goodsDetails.fruit?.isFruitUsePesticide === 'true'
                  ? 'yes'
                  : 'no' || 'NA'}
              </p>
              <p>
                {goodsDetails.fruit?.isFruitUseWax === 'true'
                  ? 'yes'
                  : 'no' || 'NA'}
              </p>
            </div>
          </div>
      )}
      {currentTab === 'report' && reportedProduct && (
        <div className="px-2 mt-3 flex flex-row space-x-2 text-sm minlg:text-lg">
          <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-semibold">
            <p>Number of reported case:</p>
            <p>Comments:</p>
          </div>

          <div className="flex flex-col space-y-2 pb-2 font-poppins dark:text-white text-nft-black-1 font-normal">
            <p>{reportedProduct.numberOfReport || 'NA'}</p>
            <ol>
              {reportedProduct.comment?.map((report, index) => (
                <li>{`${index + 1}) ${report}`}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default GoodsTab;
