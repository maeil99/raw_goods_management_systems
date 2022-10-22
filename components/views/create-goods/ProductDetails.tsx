/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useState } from 'react';
import { GoodsContext, ICryptoPrice } from '../../../context/GoodsContext';
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

const ProductDetails = ({ setFieldValueFormik }: IProductDetailsProps) => {
  const { goodsCurrency, currentETHMarketPrice } = useContext(GoodsContext);

  // to get latest price for 1 ETH
  const [ethPrice, setEthPrice] = useState<ICryptoPrice>();
  useEffect(() => {
    if (!currentETHMarketPrice) return;
    currentETHMarketPrice().then((res) => setEthPrice(res));
  }, []);

  return (
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
        unit={goodsCurrency}
        type={FieldType.NUMBER}
      />
      <div className="flex flex-col text-nft-dark dark:text-white sm:font-normal font-semibold text-sm">
        <p>{`1 ETH = RM ${ethPrice?.ETH.MYR}`}</p>
        {ethPrice && <p>{`1 MYR = ${1 / ethPrice.ETH.MYR} ETH`}</p>}
      </div>
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
};

export default ProductDetails;
