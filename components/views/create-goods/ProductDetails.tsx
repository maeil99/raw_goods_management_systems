/* eslint-disable import/no-unresolved */
import React from 'react';
import { FieldType, IOptionsProps } from '../../../types/form.interface';
import FormikControl from '../../layout/form/FormikControl';

interface IProductDetailsProps {
  setFieldValueFormik: any;
}

// product category option
const prodCategoryOpt: IOptionsProps[] = [
  { key: 'Select product category', value: '' },
  { key: 'Chicken', value: 'chicken' },
  { key: 'Meat', value: 'meat' },
  { key: 'Seafood', value: 'seafood' },
  { key: 'Vegetable', value: 'vegetable' },
  { key: 'Fruit', value: 'fruit' },
];

const ProductDetails = ({ setFieldValueFormik }: IProductDetailsProps) => (
  <div>
    <FormikControl
      control="uploadComponent"
      label="Upload file"
      name="productPicLink"
      setFieldValue={setFieldValueFormik}
      maxSize={10 * 1024 * 1024}
    />
    <FormikControl
      control="textField"
      label="Name"
      name="productName"
      placeholder="Product's name"
      type={FieldType.TEXT}
    />
    <FormikControl
      control="textField"
      label="Description"
      name="productDesc"
      type={FieldType.TEXTAREA}
    />
    <FormikControl
      control="textField"
      label="Price"
      name="productPrice"
      unit="ETH"
      type={FieldType.NUMBER}
    />
    <FormikControl
      control="textField"
      label="Weight"
      name="productWeight"
      unit="KG"
      type={FieldType.NUMBER}
    />
    <FormikControl
      control="selectField"
      label="Category"
      name="productCategory"
      options={prodCategoryOpt}
      type={FieldType.TEXT}
    />
    <FormikControl
      control="textField"
      label="Delivery Method"
      name="productDeliveryMethod"
      type={FieldType.TEXT}
    />
    <FormikControl
      control="textField"
      label="Delivery Period"
      name="productDeliveryPeriod"
      type={FieldType.NUMBER}
      unit="Working Days"
    />
  </div>
);

export default ProductDetails;
