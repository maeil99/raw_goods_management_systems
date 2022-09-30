// eslint-disable-next-line import/no-unresolved
import { IContactDetailsProps } from './contact.interface';
// eslint-disable-next-line import/no-unresolved
import { IProductProps } from './product.interface';

export interface IFetchGoodsProps {
  product: IProductProps;
  contact: IContactDetailsProps;
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
