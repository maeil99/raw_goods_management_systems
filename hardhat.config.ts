import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-chai-matchers';

import { readFileSync } from 'fs';

const privateKey = readFileSync('.secret').toString().trim();

const config: HardhatUserConfig = {
  defaultNetwork: 'goerli',
  networks: {
    hardhat: {
      // for testing purpose
      chainId: 1337,
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/5UN4579oCmhZgvlQVhd-JHcH_CcQKn4Y',
      accounts: [`0x${privateKey}`],
    },
  },
  solidity: '0.8.9',
};

export default config;
