import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
// eslint-disable-next-line import/no-unresolved
import { db } from '../../firebase/firebaseConfig';
// eslint-disable-next-line import/no-unresolved
import { IFirebaseCollectionProps, IReportUserProps } from '../../types/firebase.interface';

export const useCollection = ({ databaseCollection }:IFirebaseCollectionProps) => {
  const [documents, setDocuments] = useState<IReportUserProps[] | null>(null);

  useEffect(() => {
    const ref = collection(db, databaseCollection);
    const unSubscribe = onSnapshot(ref, (snapshot) => {
      const results:IReportUserProps[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });

    return () => unSubscribe();
  }, [databaseCollection]);

  return { documents };
};
