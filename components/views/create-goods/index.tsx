/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {
  FieldType,
  IFormFieldProps,
  IOptionsProps,
} from '../../../types/form.interface';
import Button from '../../Button';
import FormikControl from '../../layout/form/FormikControl';
// TODO need to revamp the component
// import UploadFile from '../../layout/form/UploadFile';

interface IChickenProps {
  chickenOpt: IOptionsProps[];
  chickenHormone: IOptionsProps[];
}

const ChickenFieldForm = ({ chickenOpt, chickenHormone }: IChickenProps) => (
  <>
    <FormikControl
      control="selectField"
      label="Chicken Parts"
      name="chickenOption"
      options={chickenOpt}
      type={FieldType.TEXT}
    />
    <FormikControl
      control="selectField"
      label="Does the chicken ever get hormone injection ?"
      name="chickenHormone"
      options={chickenHormone}
      type={FieldType.TEXT}
    />
  </>
);

interface IMeatProps {
  meatAnimalTypes: IOptionsProps[];
  meatHormone: IOptionsProps[];
  meatImport: IOptionsProps[];
  IsMeatImportAns?: boolean;
}

const MeatFieldForm = ({
  IsMeatImportAns,
  meatAnimalTypes,
  meatHormone,
  meatImport,
}: IMeatProps) => (
  <>
    <FormikControl
      control="selectField"
      label="What type of meat ?"
      name="meatAnimalTypes"
      options={meatAnimalTypes}
      type={FieldType.TEXT}
    />
    <FormikControl
      control="selectField"
      label="Does the meat imported ?"
      name="meatImport"
      options={meatImport}
      type={FieldType.TEXT}
    />
    {IsMeatImportAns && (
      <FormikControl
        control="textField"
        label="What country does the meat imported from ?"
        name="meatCountryImport"
        type={FieldType.TEXT}
      />
    )}
    <FormikControl
      control="selectField"
      label="Does the meat ever get hormone injection ?"
      name="meatHormone"
      options={meatHormone}
      type={FieldType.TEXT}
    />
  </>
);

const CreateGoods = () => {
  const createdAt = new Date().toJSON();
  // initial values
  const initialValue: IFormFieldProps = {
    productName: '',
    productCategory: '',
    productDesc: '',
    productPrice: 0,
    productWeight: 0,
    productDeliveryMethod: '',
    productDeliveryPeriod: 0,
    // productPic: null,
    meatImport: undefined,
    createdAt,
  };

  // validation schema
  const validationSchema = Yup.object({
    productName: Yup.string()
      .required('This field is required')
      .min(2, 'Minimum character is 2'),
    productCategory: Yup.string().required('This field is required'),
    productDesc: Yup.string()
      .required('This field is required')
      .min(2, 'Minimum character is 2'),
    productPrice: Yup.number()
      .required('This field is required')
      .typeError('you must specify a number')
      .moreThan(0, 'price must be greater than 0'),
    productWeight: Yup.number()
      .required('This field is required')
      .typeError('you must specify a number')
      .moreThan(0, 'weight must be greater than 0'),
    productDeliveryMethod: Yup.string()
      .required('This field is required')
      .min(2, 'Minimum character is 2'),
    productDeliveryPeriod: Yup.number()
      .required('This field is required')
      .typeError('you must specify a number')
      .moreThan(0, 'delivery period must be greater than 0'),
  });

  // submit
  const onSubmit = (values: IFormFieldProps) => {
    // sambung sini
    // const { productPic } = values;
    console.log({ values });
    // console.log(productPic);
  };

  // product category option
  const prodCategoryOpt: IOptionsProps[] = [
    { key: 'Select product category', value: '' },
    { key: 'Chicken', value: 'chicken' },
    { key: 'Meat', value: 'meat' },
    { key: 'Seafood', value: 'seafood' },
    { key: 'Vegetable', value: 'vegetable' },
    { key: 'Fruit', value: 'fruit' },
  ];

  // true or false option
  const trueOrFalseQuestion: IOptionsProps[] = [
    { key: 'Select one', value: '' },
    { key: 'Yes', value: true },
    { key: 'No', value: false },
  ];

  // chicken parts option
  const chickenOpt: IOptionsProps[] = [
    { key: 'Select chicken parts', value: '' },
    { key: 'Breast', value: 'breast' },
    { key: 'Wings', value: 'wings' },
    { key: 'Drumsticks', value: 'drumsticks' },
    { key: 'Ham', value: 'ham' },
    { key: 'Thigh', value: 'thigh' },
    { key: 'Liver', value: 'liver' },
    { key: 'Fourquaters', value: 'fourquaters' },
    { key: 'Hindquaters', value: 'hindquaters' },
    { key: 'Carcass', value: 'carcass' },
  ];

  // true or false option
  const meatAnimalTypes: IOptionsProps[] = [
    { key: 'Select one', value: '' },
    { key: 'Cow', value: 'cow' },
    { key: 'Goat', value: 'goat' },
    { key: 'Buffalo', value: 'buffalo' },
    { key: 'Sheep', value: 'sheep' },
  ];

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <div className="flex justify-center sm:px-4 p-12">
            <div className="W-3/5 md:w-full">
              <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                Create New Product
              </h1>
              {/* <UploadFile
                accept="image/*"
                label="Upload file"
                name="productPic"
                setFieldValue={formik.setFieldValue}
              /> */}
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
              {formik.values.productCategory === 'chicken' && (
                <ChickenFieldForm
                  chickenOpt={chickenOpt}
                  chickenHormone={trueOrFalseQuestion}
                />
              )}
              {formik.values.productCategory === 'meat' && (
                <MeatFieldForm
                  IsMeatImportAns={formik.values.meatImport}
                  meatAnimalTypes={meatAnimalTypes}
                  meatHormone={trueOrFalseQuestion}
                  meatImport={trueOrFalseQuestion}
                />
              )}
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

              {/* <div className="mt-16">
        <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
          Upload File
        </p>
        <div className="mt-4">
          <div {...getRootProps()} className={filestyles}>
            <input {...getInputProps()} />
            <div className="flexCenter flex-col text-center">
              <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                JPG, GIF, SVG, WEBM Max 100mb.
              </p>
              <div className="my-12 w-full flex justify-center">
                <Image
                  src={images.upload}
                  width={100}
                  height={100}
                  objectFit="contain"
                  alt="file upload"
                  className={theme === 'light' ? 'filter invert' : ''}
                />
              </div>

              <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                Drag and Drop File
              </p>

              <p className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                or Browse media on your device
              </p>
            </div>
          </div>
          {fileUrl && (
          <aside>
            <div>
              <img src={fileUrl} alt="asset_file" />
            </div>
          </aside>
          )}
        </div>
      </div> */}
              <div className="mt-7 w-full flex justify-end">
                <Button
                  btnName="Create Product"
                  classStyles="rounded-xl"
                  btnType="submit"
                  disabled={!formik.isValid}
                  handleClick={() => {}}
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateGoods;
