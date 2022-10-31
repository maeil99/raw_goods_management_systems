import React from 'react';
/* eslint-disable react/require-default-props */
interface IButtonProps {
    btnName: string;
    btnType: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    classStyles?: string;
    handleClick?: () => void;
  }

const BareButton = ({
  btnName,
  classStyles = '',
  btnType = 'button',
  disabled,
  handleClick,
}: IButtonProps) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={btnType}
    className={`${
      disabled ? 'bg-nft-gray-2' : ''
    } px-2 py-2 text-sm minlg:text-lg font-poppins font-bold text-nft-dark dark:text-white hover:bg-nft-dark hover:dark:bg-white hover:text-white hover:dark:text-nft-black-2 dark:border dark:border-nft-dark rounded-lg  ${classStyles}`}
    onClick={handleClick}
    disabled={disabled}
  >
    {btnName}
  </button>
);

export default BareButton;
