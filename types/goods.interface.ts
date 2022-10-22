// eslint-disable-next-line import/no-unresolved
import { IContactDetailsProps } from './contact.interface';
// eslint-disable-next-line import/no-unresolved
import { IProductProps } from './product.interface';

export interface IFetchGoodsProps {
  product: IProductProps;
  contact: IContactDetailsProps;
}

export interface IGoodsDetailsQueryProps {
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
  contactName: string;
  contactAddress: string;
  contactEmail: string;
  contactMOC: string;
  contactPhoneNo?: string;
}

export interface IFormattedGoods {
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  tokenURI: any;
  product: IProductProps;
  contact: IContactDetailsProps;
}
