/* eslint-disable react/require-default-props */
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

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
        return '/created-goods';
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

export default MenuItems;
