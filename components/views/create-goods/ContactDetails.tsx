/* eslint-disable import/no-unresolved */
import React from 'react';
import { FieldType, IOptionsProps } from '../../../types/form.interface';
import FormikControl from '../../layout/form/FormikControl';

interface IContactProps {
  mocAns: string;
}

// mode of contact opt
const mocOptions: IOptionsProps[] = [
  { key: 'Select one', value: '' },
  { key: 'Email', value: 'emailmoc' },
  { key: 'Telephone', value: 'telephonemoc' },
];

const ContactDetails = ({ mocAns }: IContactProps) => (
  <>
    <FormikControl
      control="textField"
      label="Name"
      name="contactName"
      type={FieldType.TEXT}
    />
    <FormikControl
      control="textField"
      label="Home address"
      name="contactAddress"
      type={FieldType.TEXT}
    />
    <FormikControl
      control="textField"
      label="Email"
      name="contactEmail"
      type={FieldType.EMAIL}
    />
    <FormikControl
      control="selectField"
      label="Mode of Contact"
      name="contactMOC"
      type={FieldType.TEXT}
      options={mocOptions}
    />
    {mocAns === 'telephonemoc' && (
      <FormikControl
        control="textField"
        label="Phone number"
        name="contactPhoneNo"
        type={FieldType.TEL}
        placeholder="format: 01X XXX XXXX"
      />
    )}
  </>
);

export default ContactDetails;
