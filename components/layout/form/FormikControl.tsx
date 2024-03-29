/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
import { IFormikProps, IOptionsProps } from '../../../types/form.interface';
import SelectField from './SelectField';
import TextField from './TextField';
import SelectDatePicker from './SelectDatePicker';
import UploadFile from './UploadFile';

interface IFormikControlProps extends IFormikProps {
  control: 'textField' | 'selectField' | 'dateField' | 'uploadComponent';
  // eslint-disable-next-line react/require-default-props
  options?: IOptionsProps[];
  placeholder?: string;
  unit?: string;
  maxSize?: number;
  setFieldValue?: any;
  ethPrice?: boolean;
}

const FormikControl = (props: IFormikControlProps) => {
  const { control, maxSize, setFieldValue, ethPrice, ...rest } = props;
  switch (control) {
    case 'textField':
      return <TextField ethPrice={ethPrice} {...rest} />;
    case 'selectField':
      return <SelectField {...rest} />;
    case 'dateField':
      return <SelectDatePicker {...rest} />;
    case 'uploadComponent':
      return (
        <UploadFile setFieldValue={setFieldValue} maxSize={maxSize} {...rest} />
      );
    default:
      return null;
  }
};

export default FormikControl;
