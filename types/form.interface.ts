/* eslint-disable no-unused-vars */
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
  contactName: string;
  contactAddress: string;
  contactEmail: string;
  contactMOC: string;
  contactPhoneNo?: string;

  // chicken details
  chickenOption?: string;
  chickenHormone?: string;

  // meat details
  meatAnimalTypes?: string;
  meatImport?: string;
  meatCountryImport?: string;
  meatHormone?: string;

  // seafood details
  seafoodTypes?: string;
  fishList?: string;
  fishFresh?: string;
  fishClean?: string;
  fishPreservation?: string;
  molluscaList?: string;
  crustaceaList?: string;

  // vegetables
  vegList?:string;
  vegFertilizer?:string;
  vegTypeOfFertilizer?:string;
  vegImport?:string,
  vegCountryImport?:string,
  vegPesticide?:string;

  // fruit
  fruitList?:string;
  fruitFertilizer?:string;
  fruitImport?:string;
  fruitCountryImport?:string;
  fruitPlant?:string;
  fruitPesticide?:string;
  fruitWax?:string;

  createdAt: string;
}

// eslint-disable-next-line no-shadow
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
