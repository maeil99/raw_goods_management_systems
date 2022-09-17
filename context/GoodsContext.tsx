import React, { useState, useEffect } from 'react';
import web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { create as ipfsHTTPClient } from 'ipfs-http-client';

import { MarketAddress, MarketAddressABI } from './constant';

interface IContextProps {
  children: React.ReactNode;
}

interface ICreateContextProps {
  goodsCurrency: string;
  currentAccount: string;
  connectWallet?: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  uploadToIPFS?: (file: File) => Promise<string | undefined>;
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

export const GoodsContext = React.createContext<ICreateContextProps>({
  goodsCurrency: '',
  currentAccount: '',
  connectWallet: undefined,
  uploadToIPFS: undefined,
});

export const GoodsProvider = ({ children }: IContextProps) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const goodsCurrency = 'DAI';

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

  return (
    <GoodsContext.Provider
      value={{ goodsCurrency, connectWallet, currentAccount, uploadToIPFS }}
    >
      {children}
    </GoodsContext.Provider>
  );
};
