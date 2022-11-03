import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
// eslint-disable-next-line import/no-unresolved
import { db } from '../../firebase/firebaseConfig';

interface IAddDataProps {
  comment?: string;
}

interface IFireStoreProps {
  collectionName: string;
  method: 'add' | 'delete';
  data?: IAddDataProps;
  deleteId?:string;
}

const useFirestore = async ({ collectionName, method, data, deleteId }: IFireStoreProps) => {
  if (method === 'add') {
    const ref = collection(db, collectionName);
    await addDoc(ref, {
      comment: data?.comment,
    });
  } else if (method === 'delete' && deleteId) {
    const ref = doc(db, collectionName, deleteId);
    await deleteDoc(ref);
  }
};

export default useFirestore;
