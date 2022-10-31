// eslint-disable-next-line import/no-unresolved
import { IContactDetailsProps } from './contact.interface';
// eslint-disable-next-line import/no-unresolved
import { IProductProps } from './product.interface';

export interface IGoodsDetailsQueryProps {
  // product
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

  // contact
  contactName: string;
  contactAddress: string;
  contactEmail: string;
  contactMOC: string;
  contactPhoneNo?: string;

  // chicken
  isChickenHormone?: string;
  chickenType?: string;

  // meat
  meatType?: string;
  isMeatImported?: string;
  isMeatHormone?: string;
  meatImportedCountry?: string;

  // seafood
  seafoodTypes?: string;
  typeOfFish?: string;
  isFishClean?: string;
  isFishFresh?: string;
  isFishHavePreservation?: string;
  typeOfCrustacea?: string;
  typeOfMollusca?: string;

  // vegetable
  vegType?: string;
  isVegUseFertilizer?: string;
  vegFertilizerType?: string;
  isVegImported?: string;
  vegImportedCountry?: string;
  isVegUsePesticide?: string;

  // fruit
  fruitType?: string;
  isFruitFertilize?: string;
  isFruitImported?: string;
  fruitImportedCountry?: string;
  whereFruitPlanted?: string;
  isFruitUsePesticide?: string;
  isFruitUseWax?: string;
}

export interface IGoodsDetailsProps {
  chicken?: {
    isChickenHormone: string;
    chickenType: string;
  };
  meat?: {
    meatType: string;
    isMeatImported: string;
    isMeatHormone: string;
    meatImportedCountry: string;
  };
  seafood?: {
    seafoodTypes: string;
    typeOfFish: string;
    isFishClean: string;
    isFishFresh: string;
    isFishHavePreservation: string;
    typeOfCrustacea: string;
    typeOfMollusca: string;
  };
  vegetable?: {
    vegType: string;
    isVegUseFertilizer: string;
    vegFertilizerType: string;
    isVegImported: string;
    vegImportedCountry: string;
    isVegUsePesticide: string;
  };
  fruit?: {
    fruitType: string;
    isFruitFertilize: string;
    isFruitImported: string;
    fruitImportedCountry: string;
    whereFruitPlanted: string;
    isFruitUsePesticide: string;
    isFruitUseWax: string;
  };
}

export interface IFetchGoodsProps {
  product: IProductProps;
  contact: IContactDetailsProps;
  goodsDetails: IGoodsDetailsProps;
}

export interface IFormattedGoods {
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  tokenURI: any;
  product: IProductProps;
  contact: IContactDetailsProps;
  goodsDetails: IGoodsDetailsProps;
}
