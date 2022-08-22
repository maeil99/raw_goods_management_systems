/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export interface IFormFieldProps {
  productName: string;
  productCategory: string;
  productPrice: number;
  productDesc: string;
  productWeight:number;
  productDeliveryMethod:string;
  productDeliveryPeriod:number;
  productPicLink:File | null;

  // meat details
  meatImport?: boolean;
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
  value: string | boolean;
}
