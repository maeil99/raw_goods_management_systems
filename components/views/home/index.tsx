/* eslint-disable import/no-unresolved */
import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

// import { getCreators } from '../utils/getTopCreators';

import images from '../../../assets';
import { GoodsContext } from '../../../context/GoodsContext';
import { IFormattedGoods } from '../../../types/product.interface';
import Banner from '../../Banner';
import Loader from '../../Loader';
import SearchBar from '../../SearchBar';
import GoodsCard from '../../GoodsCard';

const Home = () => {
  // ? the theme only used for revert color in images
  const [listOfGoods, setGoods] = useState<IFormattedGoods[]>();
  const { fetchGoods } = useContext(GoodsContext);
  const [hideButtons, setHideButtons] = useState(false);
  // const [nFTs, setNFTs] = useState([]);
  const [nftsCopy, setNftsCopy] = useState<IFormattedGoods[]>([]);

  const [activeSelect, setActiveSelect] = useState('Recently added');

  const [isLoading, setIsLoading] = useState(true);

  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!fetchGoods) return;
    fetchGoods().then((items) => {
      setGoods(items);
      setNftsCopy(items);
      setIsLoading(false);
      console.log('items: ', items);
    });
  }, []);
  console.log('goods from homepage: ', listOfGoods);
  // useEffect(() => {
  //   const sortedNFT = [...nFTs];
  //   switch (activeSelect) {
  //     case 'Price (low to high)':
  //       setNFTs(sortedNFT.sort((a, b) => a.price - b.price));
  //       break;
  //     case 'Price (high to low)':
  //       setNFTs(sortedNFT.sort((a, b) => b.price - a.price));
  //       break;
  //     case 'Recently added':
  //       setNFTs(sortedNFT.sort((a, b) => b.tokenId - a.tokenId));
  //       break;
  //     default:
  //       setNFTs(nFTs);
  //       break;
  //   }
  // }, [activeSelect]);

  const onHandleSearch = (value:any) => {
    // const filteredNFTs = nFTs.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    // if (filteredNFTs.length) {
    //   setNFTs(filteredNFTs);
    // } else {
    //   setNFTs(nftsCopy);
    // }
  };

  const onClearSearch = () => {
    // if (nFTs.length && nftsCopy.length) {
    //   setNFTs(nftsCopy);
    // }
  };

  const handleScroll = (direction:any) => {
    const { current } = scrollRef;

    const scrollAmt = window.innerWidth > 1800 ? 270 : 210;

    if (current === null) return;

    if (direction === 'left') {
      // current.scrollLeft -= scrollAmt;
    } else {
      // current.scrollLeft += scrollAmt;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    // if (current?.scrollWidth >= parent?.offsetWidth) {
    //   setHideButtons(false);
    // } else {
    //   setHideButtons(true);
    // }
  };
  // if window is resized
  useEffect(() => {
    isScrollable();

    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  }, []);

  // const topCreators = getCreators(nftsCopy);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          banner={(
            <>
              Discover, collect, and sell <br />
              extraordinary NFTs
            </>
          )}
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left "
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        {!isLoading && !listOfGoods ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            That&apos;s weird...No NFTs for sale!
          </h1>
        ) : isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                Top Sellers
              </h1>
              <div
                className="relative flex-1 max-w-full flex mt-3"
                ref={parentRef}
              >
                <div
                  className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                  ref={scrollRef}
                >
                  {/* {topCreators.map((creator, i) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={i + 1}
                      creatorImage={images[`creator${i + 1}`]}
                      creatorName={shortenAddress(creator.seller)}
                      creatorEths={creator.sum}
                    />
                  ))} */}
                  {/* {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - i * 0.5}
                />
              ))} */}
                  {!hideButtons && (
                    <>
                      <div
                        onClick={() => handleScroll('left')}
                        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                      >
                        <Image
                          src={images.left}
                          layout="fill"
                          objectFit="contain"
                          alt="left_arrow"
                          className={theme === 'light' ? 'filter invert' : ''}
                        />
                      </div>
                      <div
                        onClick={() => handleScroll('right')}
                        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                      >
                        <Image
                          src={images.right}
                          layout="fill"
                          objectFit="contain"
                          alt="right_arrow"
                          className={theme === 'light' ? 'filter invert' : ''}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                  Hot NFTs
                </h1>
                <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {/* {goods.map((nft) => (
                  // <NFTCard key={nft.tokenId} nft={nft} />
                  nft
                ))} */}
                {listOfGoods && listOfGoods.map((goods, index) => (
                  <GoodsCard key={goods.tokenId} goods={goods} index={index} />
                ))}
                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  price: (10 - i * 0.534).toFixed(2),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  description: 'Cool NFT on Sale',
                }}
              />
            ))} */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
