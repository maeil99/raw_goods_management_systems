import marketAbi from './GoodsMarketplace.json';

// get from deployed smart contract
export const MarketAddress = process.env.NODE_ENV === 'development'
  ? '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  : '0x252d3407914ca6DED8eb62D1C9A7E8608DfB827c';

export const MarketAddressABI = marketAbi.abi;

// 0x5FbDB2315678afecb367f032d93F642f64180aa3
// 0x252d3407914ca6DED8eb62D1C9A7E8608DfB827c
