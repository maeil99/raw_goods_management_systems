/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
import { Dispatch, SetStateAction, useState, useContext } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';

import images from '../../assets';
import Button from '../Button';
import { GoodsContext } from '../../context/GoodsContext';

// Button Group
interface IButtonGroup {
  setActive: Dispatch<SetStateAction<string>>;
}

const ButtonGroup = ({ setActive }: IButtonGroup) => {
  const { connectWallet, currentAccount } = useContext(GoodsContext);
  // const hasConnected = true;
  return currentAccount ? (
    <Button
      btnType="button"
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        router.push('/create-goods');
      }}
      useDefaultTheme
    />
  ) : (
    <Button
      btnType="button"
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
      useDefaultTheme
    />
  );
};

// Menu Items
interface IMenuItemsProps {
  isMobile?: boolean;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

const MenuItems = ({
  isMobile = false,
  active,
  setActive,
}: IMenuItemsProps) => {
  const generateLink = (i: number) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/listed-goods';
      case 2:
        return '/my-goods';
      default:
        return '/';
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && 'flex-col h-full'
      }`}
    >
      {['Explore Goods', 'Listed Goods', 'My Goods'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
            ${
              active === item
                ? 'dark:text-white text-nft-black-1'
                : 'dark:text-nft-gray-3 text-nft-gray-2'
            } 
            ${isMobile && 'my-5 text-xl'}`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className=" dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              CryptoKet
            </p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>
      {/* web menu */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />

          {/* create button */}
          <div className="ml-4">
            <ButtonGroup setActive={setActive} />
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div className="hidden md:flex ml-2 ">
        {isOpen ? (
          <Image
            src={images.cross}
            onClick={() => setIsOpen(false)}
            objectFit="contain"
            width={20}
            height={20}
            alt="close"
            className="filter invert dark:filter-none dark:invert-0"
          />
        ) : (
          <Image
            src={images.menu}
            objectFit="contain"
            width={25}
            height={25}
            alt="menu"
            onClick={() => setIsOpen(true)}
            className="filter invert dark:filter-none dark:invert-0"
          />
        )}
        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
