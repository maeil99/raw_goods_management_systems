/* eslint-disable import/no-unresolved */
import { NextPage } from 'next';

import { useContext, useEffect, useState } from 'react';
import { useCollection } from '../../../shared/firebaseHooks/useCollection';

import ReportCard from '../../ReportCard';
import { IReportUserProps } from '../../../types/firebase.interface';
import Loader from '../../Loader';
import ReportSearchBar from './ReportSearchBar';
import { GoodsContext } from '../../../context/GoodsContext';
import { IFormattedGoods } from '../../../types/goods.interface';

const ReportPage: NextPage = () => {
  const [isLoadingGoods, setIsLoadingGoods] = useState<boolean>(true);
  const [listOfSeller, setListOfSeller] = useState<IReportUserProps[]>([]);
  const [listOfSellerCopy, setListOfSellerCopy] = useState<IReportUserProps[]>(
    [],
  );
  const compareFn = (a: IReportUserProps, b: IReportUserProps) => {
    const noOfReportA = a.numberOfReport || 0;
    const noOfReportB = b.numberOfReport || 0;
    return noOfReportB - noOfReportA;
  };

  const reportData = useCollection({ databaseCollection: 'report' });
  const sortedData = reportData.documents?.sort(compareFn) || [];

  const { fetchGoods } = useContext(GoodsContext);
  const [listOfGoods, setListOfGoods] = useState<IFormattedGoods[]>([]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!sortedData || !fetchGoods) return;
      fetchGoods().then((items) => {
        setListOfGoods(items);
        setListOfSeller(sortedData);
        setListOfSellerCopy(sortedData);
        setIsLoadingGoods(false);
        console.log('list of reported seller: ', listOfSeller);
      });
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [sortedData]);
  //   console.log('list of goods: ', listOfGoods);
  if (isLoadingGoods) {
    return (
      <div className="flex-start min-h-screen">
        <Loader />
      </div>
    );
  }

  // for search bar function
  const onHandleSearch = (value: string) => {
    const filteredSeller = listOfSeller.filter(
      ({ seller }) => seller && seller.toLowerCase().includes(value.toLowerCase()),
    );

    if (filteredSeller.length) {
      setListOfSeller(filteredSeller);
    } else {
      setListOfSeller(listOfSellerCopy);
    }
  };

  const onClearSearch = () => {
    if (listOfSeller.length && listOfSellerCopy.length) {
      setListOfSeller(listOfSellerCopy);
    }
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      {listOfSeller && listOfSeller.length === 0 && (
        <div className="flexCenter sm:p-4 p-16 min-h-screen">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
            No Creator / Seller Reported
          </h1>
        </div>
      )}
      {listOfSeller && listOfSeller.length > 0 && (
        <div className="w-3/5 md:w-full sm:space-y-8 space-y-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
            List of Reported Seller
          </h1>
          <ReportSearchBar
            handleSearch={onHandleSearch}
            clearSearch={onClearSearch}
          />
          <div className="py-2">
            {listOfSeller.map((report) => {
              if (!report.tokenId) return;
              const filteredReportedGoods = listOfGoods.find(
                (product) => product.tokenId === Number(report.tokenId),
              );
              // console.log('filtered prod: ', filteredReportedGoods);
              return (
                <div className="py-2" key={report.id}>
                  <ReportCard
                    seller={report.seller || 'NA'}
                    reportedCases={report.numberOfReport || 0}
                    filteredGoods={filteredReportedGoods}
                  >
                    <div className="flex flex-col pb-4">
                      <p className="sm:font-medium font-semibold sm:text-sm text-lg">{`Product ID: ${report.tokenId || 'NA'}`}</p>
                      <div className="flex justify-center">
                        {report.imageURI && (
                        <img
                          src={report.imageURI}
                          className="rounded mt-4"
                          width={350}
                        />
                        )}
                      </div>
                      <div className="flex flex-col space-y-3 p-5   rounded-lg divide-y sm:text-sm text-lg">
                        <p className="sm:font-medium font-semibold">Comments:</p>
                        <div className="flex flex-col space-y-2 px-11 py-5">
                          {report.comment
                          && report.comment.map((comment, i) => (
                            <div
                              key={i}
                              className="p-5 border shadow-lg rounded-lg"
                            >
                              <p>{`${i + 1}) ${comment}`}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </ReportCard>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default ReportPage;
