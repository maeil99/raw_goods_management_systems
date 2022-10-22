/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import { FieldType, IFormikProps } from '../../../types/form.interface';
import ToolTip from '../../ToolTip';
import { GoodsContext, ICryptoPrice } from '../../../context/GoodsContext';
import images from '../../../assets';

interface ITextFieldProps extends IFormikProps {
  placeholder?: string;
  unit?: string;
  ethPrice?: boolean;
}

const TextField = (props: ITextFieldProps) => {
  const { label, name, type = 'text', unit = 'ETH', ethPrice, ...rest } = props;
  // to get latest price for 1 ETH
  const { currentETHMarketPrice } = useContext(GoodsContext);
  const [updateEthPrice, setUpdateEthPrice] = useState<ICryptoPrice>();
  useEffect(() => {
    if (!currentETHMarketPrice) return;
    currentETHMarketPrice().then((res) => setUpdateEthPrice(res));
  }, []);
  return (
    <div className="mt-10 w-full mb-5">
      {ethPrice ? (
        <div className="flex flex-row items-center space-x-1">
          <label
            htmlFor={name}
            className=" font-poppins dark:text-white text-nft-black-1 font-semibold text-xl"
          >
            {label}
          </label>
          <ToolTip
            tooltip={(
              <div className="flex flex-col text-white sm:font-normal font-semibold text-sm">
                <p>{`1 ETH = RM ${updateEthPrice?.ETH.MYR}`}</p>
                {updateEthPrice && (
                  <p>{`1 MYR = ${1 / updateEthPrice.ETH.MYR} ETH`}</p>
                )}
              </div>
            )}
          >
            <Image
              src={images.info}
              height={20}
              width={20}
              className="filter-none invert-0 dark:filter dark:invert "
            />
          </ToolTip>
        </div>
      ) : (
        <label
          htmlFor={name}
          className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl"
        >
          {label}
        </label>
      )}

      {type === FieldType.TEXTAREA && (
        <Field
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          id={name}
          name={name}
          as="textarea"
          {...rest}
        />
      )}

      {/* // TODO need to establish currency with Context later */}

      {type === FieldType.NUMBER && (
        <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <Field
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            id={name}
            name={name}
            type={type}
            {...rest}
          />
          <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            {unit}
          </p>
        </div>
      )}
      {type !== FieldType.TEXTAREA && type !== FieldType.NUMBER && (
        <Field
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          id={name}
          name={name}
          {...rest}
        />
      )}
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default TextField;
