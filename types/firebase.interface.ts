export interface IFirebaseConfigProps {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface IFirebaseCollectionProps {
  databaseCollection: string;
  _query?: string[];
  _orderBy?: any;
}

export interface IReportUserProps {
  id: string;
  comment?: string[];
  seller?: string;
  numberOfReport?: number;
  tokenURI?: string;
  tokenId?: string;
  imageURI?:string;
}
