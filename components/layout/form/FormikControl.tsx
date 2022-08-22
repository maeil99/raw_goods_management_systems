/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
import { IFormikProps, IOptionsProps } from '../../../types/form.interface';
import SelectField from './SelectField';
import TextField from './TextField';
import SelectDatePicker from './SelectDatePicker';

interface IFormikControlProps extends IFormikProps {
  control: 'textField' | 'selectField' | 'dateField';
  // eslint-disable-next-line react/require-default-props
  options?: IOptionsProps[];
  placeholder?:string;
  unit?:string;
}

const FormikControl = (props: IFormikControlProps) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'textField':
      return <TextField {...rest} />;
    case 'selectField':
      return <SelectField {...rest} />;
    case 'dateField':
      return <SelectDatePicker {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
