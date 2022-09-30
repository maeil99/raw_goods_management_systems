/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { GoodsContext } from '../../../context/GoodsContext';
import { IFormFieldProps } from '../../../types/form.interface';
import Button from '../../Button';
import ContactDetails from './ContactDetails';
// TODO un comment later
// import ContactDetails from './ContactDetails';
// import {
//   ChickenFieldForm,
//   SeafoodFieldForm,
//   MeatFieldForm,
// } from './GoodsDetails';
import ProductDetails from './ProductDetails';

const CreateGoods = () => {
  const createdAt = new Date().toJSON();
  const { createGoods } = useContext(GoodsContext);
  // TODO un comment later
  // const [isSubmit, setIsSubmit] = useState<ISubmitForm>();
  const router = useRouter();

  // handle pages
  // TODO un comment later
  const [isProductPage, setIsProductPage] = useState(true);
  const [isContactPage, setIsContactPage] = useState(false);
  // const [isProductDetailPage, setIsProductDetailPage] = useState(false);

  // initial values
  const initialValue: IFormFieldProps = {
    productName: '',
    productCategory: '',
    productDesc: '',
    productPrice: 0,
    productWeight: 0,
    productDeliveryMethod: '',
    productDeliveryPeriod: 0,
    productPicLink: null,
    // contact
    // TODO un comment later
    contactName: '',
    contactAddress: '',
    contactEmail: '',
    contactMOC: '',
    contactPhoneNo: '',
    // chicken
    // TODO un comment later
    // chickenHormone: '',
    // chickenOption: '',
    // meatAnimalTypes: '',
    // meat
    // TODO un comment later
    // meatImport: undefined,
    // meatCountryImport: '',
    // meatHormone: '',
    // seafood
    // TODO un comment later
    // seafoodTypes: '',
    createdAt,
  };

  // Phone regex
  // TODO un comment later
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // validation schema
  const validationSchema = Yup.object({
    productPicLink: Yup.mixed().required('A picture is required'),
    productName: Yup.string()
      .required('This field is required')
      .min(2, 'Minimum character is 2'),
    productCategory: Yup.string().required('Please select a category'),
    productDesc: Yup.string()
      .required('Description is required')
      .min(2, 'Minimum character is 2'),
    productPrice: Yup.number()
      .required('Price is required')
      .typeError('you must specify a number')
      .moreThan(0, 'price must be greater than 0'),
    productWeight: Yup.number()
      .required('Weight is required')
      .typeError('you must specify a number')
      .moreThan(0, 'weight must be greater than 0'),
    productDeliveryMethod: Yup.string()
      .required('Delivery method is required')
      .min(2, 'Minimum character is 2'),
    productDeliveryPeriod: Yup.number()
      .required('Delivery period is required')
      .typeError('you must specify a number')
      .moreThan(0, 'delivery period must be greater than 0'),
    // contact details
    // TODO un comment later
    contactName: Yup.string().required('This field is required'),
    contactAddress: Yup.string().required('This field is required'),
    contactEmail: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
    contactMOC: Yup.string().required('This field is required'),
    contactPhoneNo: Yup.string()
      .when('contactMOC', {
        is: 'telephonemoc',
        then: Yup.string().required('Required'),
      })
      .matches(phoneRegExp, 'Phone number is not valid'),
    // chicken
    // TODO un comment later
    // chickenHormone: Yup.string().when('productCategory', {
    //   is: 'chicken',
    //   then: Yup.string().required('This field is required'),
    // }),
    // chickenOption: Yup.string().when('productCategory', {
    //   is: 'chicken',
    //   then: Yup.string().required('Please choose chicken part'),
    // }),
    // meat
    // TODO un comment later
    // meatAnimalTypes: Yup.string().when('productCategory', {
    //   is: 'meat',
    //   then: Yup.string().required('This field is required'),
    // }),
    // meatImport: Yup.string().when('productCategory', {
    //   is: 'meat',
    //   then: Yup.string().required('This field is required'),
    // }),
    // meatCountryImport: Yup.string().when('meatImport', {
    //   is: 'true',
    //   then: Yup.string().required('This field is required'),
    // }),
    // meatHormone: Yup.string().when('productCategory', {
    //   is: 'meat',
    //   then: Yup.string().required('This field is required'),
    // }),
    // seafood
    // TODO un comment later
    // seafoodTypes: Yup.string().when('productCategory', {
    //   is: 'seafood',
    //   then: Yup.string().required('Please choose types of seafood'),
    // }),
  });

  // TODO un comment later
  // const submitForm = (values: IFormFieldProps) => {
  //   if (values.productCategory === 'chicken') {
  //     setIsSubmit({
  //       product: {
  //         name: values.productName,
  //         category: values.productCategory,
  //         price: values.productPrice,
  //         weight: values.productWeight,
  //         description: values.productDesc,
  //         deliveryMethod: values.productDeliveryMethod,
  //         deliveryPeriod: values.productDeliveryPeriod,
  //         imageURI: values.productPicLink,
  //         createdAt: values.createdAt,
  //       },
  //       productDetails: {
  //         chickenParts: values.chickenOption ? values.chickenOption : '',
  //         isChickenHormone: values.chickenHormone === 'true',
  //       },
  //       contactDetails: {
  //         name: values.contactName,
  //         email: values.contactEmail,
  //         homeAddress: values.contactAddress,
  //         phone: values.contactPhoneNo,
  //       },
  //     });
  //   }
  // };

  // submit
  const onSubmit = (values: IFormFieldProps) => {
    // sambung sini
    const { productPicLink } = values;
    console.log(`link gambar: ${productPicLink}`);
    console.log({ values });
    // submitForm(values);
    if (!createGoods || productPicLink === null) return;
    createGoods(values, productPicLink, router);
    // TODO un comment later
    // console.log('Submitted Data: ', isSubmit);
    // setIsProductDetailPage(false);
    // router.push('/');
  };

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
              {/* <ProductDetails setFieldValueFormik={formik.setFieldValue} /> */}
              {/* <div className="mt-7 w-full flex justify-end">
                <Button
                  btnName="Create Product"
                  classStyles="rounded-xl"
                  btnType="submit"
                  disabled={!formik.isValid}
                />
              </div> */}
              {isProductPage && (
                <>
                  <ProductDetails setFieldValueFormik={formik.setFieldValue} />
                  <div className="mt-7 w-full flex justify-end">
                    <Button
                      btnName="Next"
                      classStyles="rounded-xl"
                      btnType="button"
                      handleClick={() => {
                        setIsContactPage(true);
                        setIsProductPage(false);
                      }}
                    />
                  </div>
                </>
              )}
              {isContactPage && (
                <>
                  <ContactDetails mocAns={formik.values.contactMOC} />
                  <div className="mt-7 w-full flex justify-end space-x-3">
                    <Button
                      btnName="Back"
                      classStyles="rounded-xl"
                      btnType="button"
                      handleClick={() => {
                        setIsContactPage(false);
                        setIsProductPage(true);
                      }}
                    />
                    {/* temporary btn */}
                    <div className="mt-7 w-full flex justify-end">
                      <Button
                        btnName="Create Product"
                        classStyles="rounded-xl"
                        btnType="submit"
                        disabled={!formik.isValid}
                      />
                    </div>
                    {/* <Button
                      btnName="Next"
                      classStyles="rounded-xl"
                      btnType="button"
                      disabled={formik.values.productCategory === ''}
                      handleClick={() => {
                        setIsContactPage(false);
                        setIsProductPage(false);

                        setIsProductDetailPage(true);
                      }}
                    /> */}
                  </div>
                  {formik.values.productCategory === '' && (
                    <div className="text-red-500 font-semibold py-2 flex w-full justify-end">
                      product category not selected
                    </div>
                  )}
                </>
              )}
              {/* {isProductDetailPage && (
                <>
                  {formik.values.productCategory === 'chicken' && (
                    <ChickenFieldForm />
                  )}
                  {formik.values.productCategory === 'meat' && (
                    <MeatFieldForm
                      IsMeatImportAns={`${formik.values.meatImport}`}
                    />
                  )} */}
              {/* {formik.values.productCategory === 'seafood' && (
                    <SeafoodFieldForm
                      seafoodTypesAns={
                        formik.values.seafoodTypes
                          ? formik.values.seafoodTypes
                          : ''
                      }
                    />
                  )}

                  <div className="mt-7 w-full flex justify-end space-x-3">
                    <Button
                      btnName="Back"
                      classStyles="rounded-xl"
                      btnType="button"
                      handleClick={() => {
                        setIsProductDetailPage(false);
                        setIsContactPage(true);
                      }}
                    />
                    <Button
                      btnName="Create Product"
                      classStyles="rounded-xl"
                      btnType="submit"
                      disabled={!formik.isValid}
                    />
                  </div>
                  {!formik.isValid && (
                    <div className="text-red-500 font-semibold py-2 flex w-full justify-end">
                      <ul>
                        {Object.values(formik.errors).map(
                          (invalidForm, index) => (
                            <li key={index}>{invalidForm}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </>
              )} */}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateGoods;
