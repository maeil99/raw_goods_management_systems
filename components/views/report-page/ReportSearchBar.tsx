import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import images from '../../../assets';

type ReportSearchBarProps = {
    // eslint-disable-next-line no-unused-vars
    handleSearch: (value: string) => void;
    clearSearch: () => void;
  };

const ReportSearchBar = ({ clearSearch, handleSearch }:ReportSearchBarProps) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);
  return (
    <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 rounded-md py-3">
      <Image
        src={images.search}
        objectFit="contain"
        width={20}
        height={20}
        alt="search"
        className={theme === 'light' ? 'filter invert' : ''}
      />
      <input
        type="text"
        placeholder="Search seller here"
        className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-xs outline-none"
        onChange={(e) => setDebouncedSearch((e.target as HTMLInputElement).value)}
        value={debouncedSearch}
      />
    </div>
  );
};

export default ReportSearchBar;
