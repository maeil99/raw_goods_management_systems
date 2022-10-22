/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { BigNumber, ethers } from 'ethers';
import axios, { AxiosResponse } from 'axios';
import { create as ipfsHTTPClient } from 'ipfs-http-client';
import { NextRouter } from 'next/router';

import { MarketAddress, MarketAddressABI } from './constant';
import { IFormFieldProps } from '../types/form.interface';
import { IFetchGoodsProps, IFormattedGoods } from '../types/goods.interface';

interface IContextProps {
  children: React.ReactNode;
}

interface IRawGoodsData {
  tokenId: BigNumber;
  seller: string;
  owner: string;
  price: BigNumber;
}

export interface IBuyGoods {
  goodsPrice: string;
  tokenId: string;
}

export interface ICryptoPrice {
  ETH: {
    USD: number;
    MYR: number;
  };
}

interface ICreateContextProps {
  goodsCurrency: string;
  currentAccount: string;
  currentETHMarketPrice?:() => Promise<ICryptoPrice | undefined>;
  connectWallet?: () => Promise<void>;
  uploadToIPFS?: (file: File) => Promise<string | undefined>;
  createSale?: (
    url: string,
    formInputPrice: string,
    id?: string,
    isReselling?: boolean
  ) => Promise<void>;
  createGoods?: (
    formInput: IFormFieldProps,
    fileUrl: string,
    router: NextRouter
  ) => Promise<void>;
  fetchGoods?: () => Promise<IFormattedGoods[]>;
  buyGoods?: (goods: IBuyGoods) => Promise<void>;
  fetchMyGoodsOrListedGoods?: (
    type: 'fetchItemsListed' | 'fetchMyNFTs'
  ) => Promise<IFormattedGoods[]>;
  // fetchGoods?: () => Promise<IFormattedGoods[]>;
}

const projectId = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_PROJECT_ID
  : '2Et1N03iLLod4TEyJJ9Lf8dycqW';
const projectSecret = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_KEY_SECRET
  : 'b98447f3a0be37903b9175632f56ed17';
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  'base64',
)}`;
const options = {
  host: 'ipfs.infura.io',
  protocol: 'https',
  port: 5001,
  headers: { authorization: auth },
};
const client = ipfsHTTPClient(options);
const dedicatedEndPoint = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_DEDICATED_GATEWAY_DEV
  : 'https://rgsm-dev.infura-ipfs.io';

const fetchContract = (
  signerOrProvider:
    | ethers.providers.JsonRpcSigner
    | ethers.providers.JsonRpcProvider,
): ethers.Contract => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

// fetch current price for ETH
const cryptoAPI = 'd8cb697fc3ced7dc892fc46fdf5bb77841c66b1500235132cdc513bfcc8ce968';

export const GoodsContext = React.createContext<ICreateContextProps>({
  goodsCurrency: '',
  currentAccount: '',
  connectWallet: undefined,
  uploadToIPFS: undefined,
  createGoods: undefined,
  createSale: undefined,
  fetchGoods: undefined,
  buyGoods: undefined,
  fetchMyGoodsOrListedGoods: undefined,
  currentETHMarketPrice: undefined,
});

export const GoodsProvider = ({ children }: IContextProps) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const goodsCurrency = 'ETH';

  const currentETHMarketPrice = async () => {
    try {
      const eth = await axios.get<ICryptoPrice>(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=MYR,USD&api_key=${cryptoAPI}`,
      );
      const { data } = eth;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // check if metamask is connected
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found.');
    }
    console.log({ accounts });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };
  // upload picture to IPFS
  const uploadToIPFS = async (file: File) => {
    try {
      const added = await client.add({ content: file });
      const url = `${dedicatedEndPoint}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log(error);
      console.log('Error uploading file to IPFS.');
    }
  };

  const createSale = async (
    url: string,
    formInputPrice: string,
    id?: string,
    isReselling = false,
  ) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = fetchContract(signer);

    const listingPrice = await contract.getListingPrice();
    const transaction = isReselling
      ? await contract.resellToken(id, price, {
        value: listingPrice.toString(),
      })
      : await contract.createToken(url, price, {
        value: listingPrice.toString(),
      });
    await transaction.wait();
  };

  // create product
  const createGoods = async (
    formInput: IFormFieldProps,
    fileUrl: string,
    router: NextRouter,
  ) => {
    const {
      productName,
      productDesc,
      productPrice,
      productWeight,
      createdAt,
      productCategory,
      productDeliveryMethod,
      productDeliveryPeriod,
      productPicLink,
      contactName,
      contactAddress,
      contactEmail,
      contactMOC,
      contactPhoneNo,
    } = formInput;
    if (!formInput || !fileUrl) return;
    const data = JSON.stringify({
      product: {
        name: productName,
        description: productDesc,
        price: productPrice,
        weight: productWeight,
        category: productCategory,
        deliveryMethod: productDeliveryMethod,
        deliveryPeriod: productDeliveryPeriod,
        imageURI: productPicLink,
        createdAt,
      },
      contact: {
        contactName,
        contactAddress,
        contactEmail,
        contactMOC,
        contactPhoneNo: contactPhoneNo || undefined,
      },
    });
    console.log('create goods data: ', data);
    try {
      const added = await client.add(data);
      const url = `${dedicatedEndPoint}/ipfs/${added.path}`;
      console.log('url from create goods ', url);
      const price = productPrice.toString();
      await createSale(url, price);
      router.push('/');
    } catch (error) {
      console.log(error);
      console.log('Error uploading file to IPFS');
    }
  };

  // fetch all goods available in marketplace
  const fetchGoods = async (): Promise<IFormattedGoods[]> => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    const rawData = await contract.fetchMarketItems();

    const items = await Promise.all(
      (rawData as IRawGoodsData[]).map(
        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          // const metadata = await axios.get<IFetchGoodsProps>(tokenURI);
          const { data } = await axios.get<IFetchGoodsProps>(tokenURI);
          // console.log('metadata: ', metadata);
          const { product, contact } = data;
          // console.log('contact: ', contact);
          // const { category, createdAt, deliveryMethod, deliveryPeriod, description, imageURI, name, weight } = product;
          // console.log('metadata: ', data);
          // console.table(product);
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            'ether',
          );
          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            tokenURI,
            product,
            contact,
          };
        },
      ),
    );
    return items;
  };

  const buyGoods = async (goods: IBuyGoods) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    console.log('goods from buyGoods function: ', goods);
    const price = ethers.utils.parseUnits(goods.goodsPrice.toString(), 'ether');

    const transaction = await contract.createMarketSale(goods.tokenId, {
      value: price,
    });

    await transaction.wait();
  };

  const fetchMyGoodsOrListedGoods = async (
    type: 'fetchItemsListed' | 'fetchMyNFTs',
  ): Promise<IFormattedGoods[]> => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    const data = type === 'fetchItemsListed'
      ? await contract.fetchItemsListed()
      : await contract.fetchMyGoods();

    const items = await Promise.all(
      (data as IRawGoodsData[]).map(
        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const { data: fetchData } = await axios.get<IFetchGoodsProps>(
            tokenURI,
          );
          const { product, contact } = fetchData;
          // eslint-disable-next-line no-underscore-dangle
          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            'ether',
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            tokenURI,
            product,
            contact,
          };
        },
      ),
    );

    return items;
  };

  return (
    <GoodsContext.Provider
      value={{
        goodsCurrency,
        currentETHMarketPrice,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createGoods,
        createSale,
        fetchGoods,
        buyGoods,
        fetchMyGoodsOrListedGoods,
      }}
    >
      {children}
    </GoodsContext.Provider>
  );
};
