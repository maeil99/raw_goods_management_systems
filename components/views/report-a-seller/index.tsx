/* eslint-disable import/no-unresolved */
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
// import * as Yup from 'yup';

import { IFetchGoodsProps } from '../../../types/goods.interface';
import Loader from '../../Loader';
import Button from '../../Button';
import FormikControl from '../../layout/form/FormikControl';
import { FieldType } from '../../../types/form.interface';
import { useCollection } from '../../../shared/firebaseHooks/useCollection';
import useFireStore from '../../../shared/firebaseHooks/useFirestore';

interface ISubmitReportProps {
  reportSeller: string;
  reportTokenId: string;
  reportTokenURI: string;
  comment: string;
  numberOfReport: number;
}

interface IUpdateProps {
  comment?: string[];
  seller: string;
  numberOfReport: number;
  tokenURI: string;
  tokenId: string;
  id: string;
}

const ReportASeller: NextPage = () => {
  const router = useRouter();
  const { seller, tokenURI, tokenId } = router.query;
  const [image, setImage] = useState('');
  const [isLoadingGoods, setIsLoadingGoods] = useState<boolean>(true);

  const allReportedData = useCollection({ databaseCollection: 'report' });
  console.log('all reported seller: ', allReportedData);

  console.log('sent this data later: ', seller, tokenURI, tokenId);

  const fetchGoods = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get<IFetchGoodsProps>(tokenURI as string);
    const { product } = data;

    setImage(product.imageURI);
    setIsLoadingGoods(false);
  };

  useEffect(() => {
    if (tokenURI) fetchGoods();
  }, [tokenURI]);

  if (isLoadingGoods) {
    return (
      <div className="flex-start min-h-screen">
        <Loader />
      </div>
    );
  }

  const addData = async (values: ISubmitReportProps) => {
    const {
      comment,
      reportSeller,
      reportTokenId,
      reportTokenURI,
      numberOfReport,
    } = values;
    console.log('number of report: ', numberOfReport);
    const newComment: string[] = [];
    const addNewComment = newComment.concat(comment);
    await useFireStore({
      collectionName: 'report',
      method: 'add',
      data: {
        seller: reportSeller,
        numberOfReport: numberOfReport + 1,
        tokenId: reportTokenId,
        tokenURI: reportTokenURI,
        comment: addNewComment,
      },
    });
  };

  const updateData = async (findSeller: IUpdateProps, newComment: string) => {
    const attachNewComment = findSeller.comment?.concat(newComment);
    await useFireStore({
      collectionName: 'report',
      method: 'update',
      dataId: findSeller.id,
      data: {
        ...findSeller,
        numberOfReport: findSeller.numberOfReport + 1,
        comment: attachNewComment,
      },
    });
  };

  const initialValue: ISubmitReportProps = {
    reportSeller: seller as string,
    reportTokenId: tokenId as string,
    reportTokenURI: tokenURI as string,
    comment: '',
    numberOfReport: 0,
  };

  const onSubmit = (values: ISubmitReportProps) => {
    console.log(values);
    const findSeller = allReportedData.documents?.find(
      (data) => data.seller === values.reportSeller
        && data.tokenId === values.reportTokenId,
    );
    if (findSeller === undefined) {
      addData(values).then(() => router.push('/'));
    } else {
      updateData(
        {
          id: findSeller.id,
          numberOfReport: findSeller.numberOfReport || 0,
          seller: findSeller.seller || '',
          tokenId: findSeller.tokenId || '',
          tokenURI: findSeller.tokenId || '',
          comment: findSeller.comment,
        },
        values.comment,
      ).then(() => router.push('/'));
    }
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Report A Product
        </h1>
        <div className="w-full flex justify-center">
          {image && <img src={image} className="rounded mt-4" width={350} />}
        </div>

        <div>
          <Formik initialValues={initialValue} onSubmit={onSubmit}>
            {(formik) => (
              <Form>
                <div>
                  <label
                    htmlFor="seller"
                    className="flex-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-xl"
                  >
                    Seller ID
                  </label>
                  <input
                    id="seller"
                    name="seller"
                    type="text"
                    className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
                    value={seller}
                    disabled
                  />
                </div>

                {/* form goes here */}
                <div>
                  <FormikControl
                    control="textField"
                    label="Additional Comment"
                    name="comment"
                    type={FieldType.TEXTAREA}
                  />
                </div>

                <div className="mt-7 w-full flex justify-between">
                  <Button
                    btnName="Cancel Report"
                    classStyles="rounded-xl"
                    btnType="button"
                    handleClick={() => router.back()}
                    useDefaultTheme
                  />
                  <Button
                    btnName="Submit"
                    classStyles="rounded-xl"
                    btnType="submit"
                    disabled={!formik.isValid}
                    useDefaultTheme
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ReportASeller;
