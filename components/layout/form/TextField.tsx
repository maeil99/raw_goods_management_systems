/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import { FieldType, IFormikProps } from '../../../types/form.interface';

interface ITextFieldProps extends IFormikProps {
  placeholder?: string;
}

const TextField = (props: ITextFieldProps) => {
  const { label, name, type = 'text', ...rest } = props;
  return (
    <div className="mt-10 w-full mb-5">
      <label
        htmlFor={name}
        className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl"
      >
        {label}
      </label>
      {type === FieldType.TEXT && (
        <Field
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          id={name}
          name={name}
          {...rest}
        />
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
            ETH
          </p>
        </div>
      )}
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default TextField;
