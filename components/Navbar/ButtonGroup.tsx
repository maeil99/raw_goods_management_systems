/* eslint-disable import/no-unresolved */
import router from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import Button from '../Button';

interface IButtonGroup {
  setActive: Dispatch<SetStateAction<string>>;
}

const ButtonGroup = ({ setActive }: IButtonGroup) => {
  const hasConnected = true;
  return hasConnected ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        router.push('/create-nft');
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {}}
    />
  );
};
export default ButtonGroup;
