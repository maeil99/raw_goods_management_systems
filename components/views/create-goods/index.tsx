/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { GoodsContext } from '../../../context/GoodsContext';
import { IFormFieldProps } from '../../../types/form.interface';
import Button from '../../Button';
import ToolTip from '../../ToolTip';
import ContactDetails from './ContactDetails';
import {
  ChickenFieldForm,
  FruitForm,
  MeatFieldForm,
  SeafoodFieldForm,
  VegetableForm,
} from './GoodsDetails';
import ProductDetails from './ProductDetails';

const CreateGoods = () => {
  const createdAt = new Date().toJSON();
  const { createGoods } = useContext(GoodsContext);
  const router = useRouter();

  // handle pages
  const [isProductPage, setIsProductPage] = useState(true);
  const [isContactPage, setIsContactPage] = useState(false);
  const [isProductDetailsPage, setIsProductDetailsPage] = useState(false);

  // initial values
  const initialValue: IFormFieldProps = {
    // product
    productName: '',
    productCategory: '',
    productDesc: '',
    productPrice: 0,
    productWeight: 0,
    productDeliveryMethod: '',
    productDeliveryPeriod: 0,
    productPicLink: null,

    // contact
    contactName: '',
    contactAddress: '',
    contactEmail: '',
    contactMOC: '',
    contactPhoneNo: '',

    // chicken
    chickenHormone: '',
    chickenOption: '',

    // meat
    meatAnimalTypes: '',
    meatImport: '',
    meatCountryImport: '',
    meatHormone: '',

    // seafood
    seafoodTypes: '',
    fishList: '',
    fishClean: '',
    fishFresh: '',
    fishPreservation: '',
    crustaceaList: '',
    molluscaList: '',

    // vegetables
    vegList: '',
    vegFertilizer: '',
    vegTypeOfFertilizer: '',
    vegImport: '',
    vegCountryImport: '',
    vegPesticide: '',

    // fruit
    fruitCountryImport: '',
    fruitFertilizer: '',
    fruitImport: '',
    fruitList: '',
    fruitPesticide: '',
    fruitPlant: '',
    fruitWax: '',

    createdAt,
  };

  // Phone regex
  // TODO un comment later
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // validation schema
  const validationSchema = Yup.object({
    productPicLink: Yup.mixed().required('A picture is required'),
    productName: Yup.string()
      .required('Please specify a product name')
      .min(2, 'Minimum character is 2'),
    productCategory: Yup.string().required('Please select a category'),
    productDesc: Yup.string()
      .required('Please give some description for the product')
      .min(2, 'Minimum character is 2'),
    productPrice: Yup.number()
      .required('Please specify a product price')
      .typeError('you must specify a number')
      .moreThan(0, 'price must be greater than 0')
      .test(
        'maxDigits',
        'price field only accepted up to 6 decimal places',
        (productPrice) => String(productPrice).length <= 8,
      ),
    productWeight: Yup.number()
      .required('Please specify product weight')
      .typeError('you must specify a number')
      .moreThan(0, 'weight must be greater than 0'),
    productDeliveryMethod: Yup.string()
      .required('Please specify delivery method')
      .min(2, 'Minimum character is 2'),
    productDeliveryPeriod: Yup.number()
      .required('Please specify delivery period')
      .typeError('you must specify a number')
      .moreThan(0, 'delivery period must be greater than 0'),
    // contact details
    contactName: Yup.string().required('Please insert product owner name'),
    contactAddress: Yup.string().required(
      'Please insert product owner address',
    ),
    contactEmail: Yup.string()
      .email('Invalid email')
      .required('Please enter your email'),
    contactMOC: Yup.string().required(
      'Please choose type of contact you prefer',
    ),
    contactPhoneNo: Yup.string()
      .when('contactMOC', {
        is: 'telephonemoc',
        then: Yup.string().required('Please insert product owner number'),
      })
      .matches(phoneRegExp, 'Phone number is not valid'),
    // chicken
    chickenHormone: Yup.string().when('productCategory', {
      is: 'chicken',
      then: Yup.string().required('Please choose one option'),
    }),
    chickenOption: Yup.string().when('productCategory', {
      is: 'chicken',
      then: Yup.string().required('Please choose chicken part'),
    }),
    // meat
    meatAnimalTypes: Yup.string().when('productCategory', {
      is: 'meat',
      then: Yup.string().required('Please choose one option'),
    }),
    meatImport: Yup.string().when('productCategory', {
      is: 'meat',
      then: Yup.string().required('Please choose one option'),
    }),
    meatCountryImport: Yup.string().when('meatImport', {
      is: 'true',
      then: Yup.string().required(
        'PLease specify country name for imported product',
      ),
    }),
    meatHormone: Yup.string().when('productCategory', {
      is: 'meat',
      then: Yup.string().required('Please choose one option'),
    }),
    // seafood
    seafoodTypes: Yup.string().when('productCategory', {
      is: 'seafood',
      then: Yup.string().required('Please choose types of seafood'),
    }),
    fishList: Yup.string().when('seafoodTypes', {
      is: 'fish',
      then: Yup.string().required('Please choose types of fish'),
    }),
    fishFresh: Yup.string().when('seafoodTypes', {
      is: 'fish',
      then: Yup.string().required('Please choose one option'),
    }),
    fishClean: Yup.string().when('seafoodTypes', {
      is: 'fish',
      then: Yup.string().required('Please choose one option'),
    }),
    fishPreservation: Yup.string().when('seafoodTypes', {
      is: 'fish',
      then: Yup.string().required('Please choose one option'),
    }),
    molluscaList: Yup.string().when('seafoodTypes', {
      is: 'mollusca',
      then: Yup.string().required('Please choose types of mollusca'),
    }),
    crustaceaList: Yup.string().when('seafoodTypes', {
      is: 'crustacea',
      then: Yup.string().required('Please choose types of crustacea'),
    }),
    // vegetables
    vegList: Yup.string().when('productCategory', {
      is: 'vegetable',
      then: Yup.string().required('Please choose types of vegetable'),
    }),
    vegFertilizer: Yup.string().when('productCategory', {
      is: 'vegetable',
      then: Yup.string().required('Please choose one option'),
    }),
    vegTypeOfFertilizer: Yup.string().when('vegFertilizer', {
      is: 'true',
      then: Yup.string().required('Please choose one option'),
    }),
    vegImport: Yup.string().when('productCategory', {
      is: 'vegetable',
      then: Yup.string().required('Please choose one option'),
    }),
    vegCountryImport: Yup.string().when('vegImport', {
      is: 'true',
      then: Yup.string().required(
        'PLease specify country name for imported product',
      ),
    }),
    vegPesticide: Yup.string().when('productCategory', {
      is: 'vegetable',
      then: Yup.string().required('Please choose one option'),
    }),
    fruitList: Yup.string().when('productCategory', {
      is: 'fruit',
      then: Yup.string().required('Please choose one type of fruit'),
    }),
    fruitFertilizer: Yup.string().when('productCategory', {
      is: 'fruit',
      then: Yup.string().required('Please choose one option'),
    }),
    fruitImport: Yup.string().when('productCategory', {
      is: 'fruit',
      then: Yup.string().required('Please choose one option'),
    }),
    fruitCountryImport: Yup.string().when('fruitImport', {
      is: 'true',
      then: Yup.string().required(
        'PLease specify country name for imported product',
      ),
    }),
    fruitPlant: Yup.string().when('productCategory', {
      is: 'fruit',
      then: Yup.string().required('Please insert a place'),
    }),
    fruitPesticide: Yup.string().when('productCategory', {
      is: 'fruit',
      then: Yup.string().required('Please choose one option'),
    }),
    fruitWax: Yup.string().when('productCategory', {
      is: 'fruit',
      then: Yup.string().required('Please choose one option'),
    }),
  });

  // submit
  const onSubmit = (values: IFormFieldProps) => {
    const { productPicLink } = values;
    // console.log(`link gambar: ${productPicLink}`);
    // console.log({ values });

    if (!createGoods || productPicLink === null) return;
    createGoods(values, productPicLink, router);
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
            <div className="w-3/5 md:w-full">
              <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                Create New Product
              </h1>
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
                      useDefaultTheme
                    />
                  </div>
                </>
              )}
              {isContactPage && (
                <>
                  <ContactDetails mocAns={formik.values.contactMOC} />
                  <div className="mt-7 w-full flex justify-between space-x-3">
                    <Button
                      btnName="Back"
                      classStyles="rounded-xl"
                      btnType="button"
                      handleClick={() => {
                        setIsContactPage(false);
                        setIsProductPage(true);
                      }}
                      useDefaultTheme
                    />
                    <Button
                      btnName="Next"
                      classStyles="rounded-xl"
                      btnType="button"
                      disabled={formik.values.productCategory === ''}
                      handleClick={() => {
                        setIsContactPage(false);
                        setIsProductPage(false);
                        setIsProductDetailsPage(true);
                      }}
                      useDefaultTheme
                    />
                  </div>
                  {formik.values.productCategory === '' && (
                    <div className="text-red-500 font-semibold py-2 flex w-full justify-end">
                      product category not selected
                    </div>
                  )}
                </>
              )}
              {isProductDetailsPage && (
                <>
                  {formik.values.productCategory === 'chicken' && (
                    <ChickenFieldForm />
                  )}
                  {formik.values.productCategory === 'meat' && (
                    <MeatFieldForm
                      IsMeatImportAns={`${formik.values.meatImport}`}
                    />
                  )}
                  {formik.values.productCategory === 'seafood' && (
                    <SeafoodFieldForm
                      seafoodTypesAns={
                        formik.values.seafoodTypes
                          ? formik.values.seafoodTypes
                          : ''
                      }
                    />
                  )}
                  {formik.values.productCategory === 'vegetable' && (
                    <VegetableForm
                      vegIsFertilizerUsedAns={
                        formik.values.vegFertilizer
                          ? formik.values.vegFertilizer
                          : ''
                      }
                      isVegImportAns={
                        formik.values.vegImport ? formik.values.vegImport : ''
                      }
                    />
                  )}
                  {formik.values.productCategory === 'fruit' && (
                    <FruitForm isFruitImportAns={formik.values.fruitImport || ''} />
                  )}
                  <div className="mt-7 w-full flex justify-end space-x-3">
                    <Button
                      btnName="Back"
                      classStyles="rounded-xl"
                      btnType="button"
                      handleClick={() => {
                        setIsProductDetailsPage(false);
                        setIsContactPage(true);
                      }}
                      useDefaultTheme
                    />
                    {!formik.isValid ? (
                      <ToolTip
                        tooltip={(
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
                        className="bg-white text-red-500"
                      >
                        <Button
                          btnName="Create Product"
                          classStyles="rounded-xl"
                          btnType="submit"
                          disabled={!formik.isValid}
                          useDefaultTheme
                        />
                      </ToolTip>
                    ) : (
                      <Button
                        btnName="Create Product"
                        classStyles="rounded-xl"
                        btnType="submit"
                        disabled={!formik.isValid}
                        useDefaultTheme
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateGoods;
