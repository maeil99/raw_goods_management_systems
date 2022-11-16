/* eslint-disable import/no-unresolved */
import { NextPage } from 'next';

import { useEffect, useState } from 'react';
import { useCollection } from '../../../shared/firebaseHooks/useCollection';

import ReportCard from '../../ReportCard';
import { IReportUserProps } from '../../../types/firebase.interface';
import Loader from '../../Loader';
import ReportSearchBar from './ReportSearchBar';

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

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!sortedData) return;
      setListOfSeller(sortedData);
      setListOfSellerCopy(sortedData);
      setIsLoadingGoods(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [sortedData]);

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
      <div className="w-3/5 md:w-full sm:space-y-8 space-y-16">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          List of Reported Seller
        </h1>
        <ReportSearchBar
          handleSearch={onHandleSearch}
          clearSearch={onClearSearch}
        />
        <div className="py-2">
          {listOfSeller.map((report) => (
            <div className="py-2" key={report.id}>
              <ReportCard
                seller={report.seller || 'NA'}
                reportedCases={report.numberOfReport || 0}
              >
                <div className="flex flex-col pb-4">
                  <p>{`Product ID: ${report.tokenId || 'NA'}`}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
