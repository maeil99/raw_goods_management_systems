/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
import { Field, ErrorMessage } from 'formik';
import React from 'react';
import { IFormikProps, IOptionsProps } from '../../../types/form.interface';
import TextError from './TextError';

interface ISelectProps extends IFormikProps {
  options?: IOptionsProps[];
}

const SelectField = (props: ISelectProps) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={name}
        className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl"
      >
        {label}
      </label>
      <Field
        className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
        as="select"
        id={name}
        name={name}
        {...rest}
      >
        {options
          && options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default SelectField;
