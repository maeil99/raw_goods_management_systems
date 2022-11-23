import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
// eslint-disable-next-line import/no-unresolved
import { db } from '../../firebase/firebaseConfig';

interface IAddDataProps {
  comment?: string[];
  seller: string;
  numberOfReport: number;
  tokenURI: string;
  tokenId: string;
  imageURI:string;
}

interface IFireStoreProps {
  collectionName: string;
  method: 'add' | 'delete' | 'update';
  data?: IAddDataProps;
  // needs this id for delete and update
  dataId?: string;
}

const useFireStore = async ({
  collectionName,
  method,
  data,
  dataId,
}: IFireStoreProps) => {
  if (method === 'add') {
    if (!data) return;
    const ref = collection(db, collectionName);
    await addDoc(ref, data);
  } else if (method === 'delete') {
    if (!dataId) return;
    const ref = doc(db, collectionName, dataId);
    await deleteDoc(ref);
  } else {
    if (!dataId) return;
    const ref = doc(db, collectionName, dataId);
    // console.log('data for update: ', data);
    await updateDoc(ref, {
      ...data,
    });
  }
};

export default useFireStore;
