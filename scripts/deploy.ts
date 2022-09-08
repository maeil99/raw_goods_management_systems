import { ethers } from 'hardhat';

async function main() {
  const GoodsMarketplace = await ethers.getContractFactory('GoodsMarketplace');
  const goodsMarketplace = await GoodsMarketplace.deploy();

  await goodsMarketplace.deployed();

  console.log('GoodsMarketplace deployed to:', goodsMarketplace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
