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

const CreateGoods = () => {
  const createdAt = new Date().toJSON();
  // initial values
  const initialValue: IFormFieldProps = {
    productName: '',
    productCategory: '',
    productDesc: '',
    productPrice: undefined,
    createdAt,
  };

  // validation schema
  const validationSchema = Yup.object({
    productName: Yup.string().required('This field is required'),
    productCategory: Yup.string().required('This field is required'),
    productDesc: Yup.string().required('This field is required'),
    productPrice: Yup.number()
      .required('This field is required')
      .typeError('you must specify a number')
      .min(0, 'minimum price is 0'),
  });

  // submit
  const onSubmit = (values: IFormFieldProps) => {
    console.log({ values });
  };

  // select option
  const prodCategoryOpt: IOptionsProps[] = [
    { key: 'Select product category', value: '' },
    { key: 'chicken', value: 'Chicken' },
    { key: 'meat', value: 'Meat' },
    { key: 'seafood', value: 'Seafood' },
    { key: 'vegetable', value: 'Vegetable' },
    { key: 'fruit', value: 'Fruit' },
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
              <FormikControl
                control="textField"
                label="Name"
                name="productName"
                placeholder="Product's name"
                type={FieldType.TEXT}
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
                label="Description"
                name="productCategory"
                type={FieldType.TEXTAREA}
              />
              <FormikControl
                control="textField"
                label="Price"
                name="productPrice"
                type={FieldType.NUMBER}
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
