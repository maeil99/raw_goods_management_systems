/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */

import { BigNumber } from 'ethers';
import { IChickenProps } from './chicken.interface';
import { IContactDetailsProps } from './contact.interface';
import { IMeatProps } from './meat.interface';
import { IProductProps } from './product.interface';

/* eslint-disable no-shadow */
export interface IFormFieldProps {
  productName: string;
  productCategory: string;
  productPrice: number;
  productDesc: string;
  productWeight: number;
  productDeliveryMethod: string;
  productDeliveryPeriod: number;
  productPicLink: string | null;

  // contact details
  // TODO un comment later
  // contactName: string;
  // contactAddress: string;
  // contactEmail: string;
  // contactMOC: string;
  // contactPhoneNo?: string;

  // chicken details
  // TODO un comment later
  // chickenOption?: string;
  // chickenHormone?: string;

  // meat details
  // TODO un comment later
  // meatAnimalTypes?: string;
  // meatImport?: boolean;
  // meatCountryImport?: string;
  // meatHormone?: string;

  // TODO un comment later
  // seafood details
  // seafoodTypes?: string;

  createdAt: string;
}

export enum FieldType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number',
  CHECKBOX = 'checkbox',
  COLOR = 'color',
  DATE = 'date',
  DATETIME_LOCAL = 'datetime-local',
  FILE = 'file',
  HIDDEN = 'hidden',
  IMAGE = 'image',
  RADIO = 'radio',
  RANGE = 'range',
  RESET = 'reset',
  SEARCH = 'search',
  TEL = 'tel',
  TIME = 'time',
  URL = 'url',
  TEXTAREA = 'textarea',
}

export interface IFormikProps {
  type?: FieldType;
  label: string;
  name: string;
}

export interface IOptionsProps {
  key: string;
  value: string | number | readonly string[];
}

export interface ISubmitForm {
  product: IProductProps;
  contactDetails: IContactDetailsProps;
  productDetails: IChickenProps | IMeatProps;
}
