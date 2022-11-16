/* eslint-disable import/no-unresolved */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import MiniChevronDownIcon from '../assets/icons/MiniChevronDownIcon';

type IReportCardProps = {
  seller: string;
  reportedCases: number;
  className?: string;
  children?: React.ReactNode;
};

const ReportCard = ({
  children,
  className,
  seller,
  reportedCases,
}: IReportCardProps) => {
  const [toggleCard, setToggleCard] = useState(false);
  return (
    <div
      className={`${className} bg-white dark:bg-nft-black-1 border border-gray-400 rounded-xl divide-y divide-solid sm:px-3 px-6 shadow-md`}
    >
      <div className="flex justify-between sm:mb-2 mb-4 sm:pt-3 pt-6 sm:text-sm text-lg sm:font-semibold font-bold">
        <p>{seller}</p>
        <div className="flex space-x-2">
          <div className="bg-red-500 py-2 rounded-lg px-2 text-white  sm:shadow-sm shadow-lg">
            <p>
              {`${reportedCases} ${
                reportedCases === 1 ? 'case' : 'cases'
              } reported`}
            </p>
          </div>

          <div onClick={() => setToggleCard(!toggleCard)}>
            <MiniChevronDownIcon
              className={`text-gray-400 sm:w-3 w-6 sm:h-3 h-6 transform transition duration-200 ${
                toggleCard ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
        </div>
      </div>
      <div className={`${toggleCard ? '' : 'hidden '}`}>
        <div className="flex flex-col divide-y divide-solid">{children}</div>
      </div>
    </div>
  );
};

export default ReportCard;
