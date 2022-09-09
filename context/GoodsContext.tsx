import React, { useState, useEffect } from 'react';
import web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constant';

interface IContextProps {
  children: React.ReactNode;
}

interface ICreateContextProps {
  goodsCurrency: string;
  currentAccount: string;
  connectWallet?: () => Promise<void>;
}

export const GoodsContext = React.createContext<ICreateContextProps>({
  goodsCurrency: '',
  currentAccount: '',
  connectWallet: undefined,
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

  return (
    <GoodsContext.Provider value={{ goodsCurrency, connectWallet, currentAccount }}>
      {children}
    </GoodsContext.Provider>
  );
};
