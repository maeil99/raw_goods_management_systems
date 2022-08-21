/* eslint-disable react/require-default-props */
interface IButtonProps {
  btnName: string;
  btnType: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  classStyles?: string;
  handleClick?: () => void;
}

const Button = ({ btnName, classStyles = '', btnType = 'button', disabled, handleClick }: IButtonProps) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={btnType}
    className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
    onClick={handleClick}
    disabled={disabled}
  >
    {btnName}
  </button>
);

export default Button;
