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
  accept?: 'image/*' | 'application/*' | 'video/*';
  maxSize?: number;
  setFieldValue?: any;
}

const FormikControl = (props: IFormikControlProps) => {
  const { control, accept, maxSize, setFieldValue, ...rest } = props;
  switch (control) {
    case 'textField':
      return <TextField {...rest} />;
    case 'selectField':
      return <SelectField {...rest} />;
    case 'dateField':
      return <SelectDatePicker {...rest} />;
    case 'uploadComponent':
      return (
        <UploadFile
          setFieldValue={setFieldValue}
          accept={accept}
          maxSize={maxSize}
          {...rest}
        />
      );
    default:
      return null;
  }
};

export default FormikControl;
