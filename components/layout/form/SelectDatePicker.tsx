/* eslint-disable import/no-unresolved */
import { Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IFormikProps } from '../../../types/form.interface';
import TextError from './TextError';

const SelectDatePicker = (props:IFormikProps) => {
  const { label, name, ...rest } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ field, form }: any) => {
          console.log('Field: ', field, <br />, 'Form: ', form);
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DatePicker
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(date) => setFieldValue(name, date)}
            />
          );
        }}
      </Field>

      <ErrorMessage name={name} component={TextError} />

    </div>
  );
};
export default SelectDatePicker;
