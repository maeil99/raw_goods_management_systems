import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';

import { readFileSync } from 'fs';

const privateKey = readFileSync('.secret').toString().trim();

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      // for testing purpose
      chainId: 1337,
    },
  },
  solidity: '0.8.9',
};

export default config;
