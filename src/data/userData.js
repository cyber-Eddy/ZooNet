
import { collection, getDocs } from 'firebase/firestore'

import { db } from "../firebase";


const getUsersData = async () => {

    const dataCollection = collection(db, 'users');
    const querySnapshot = await getDocs(dataCollection);
    const data = [];
    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        docData.id = doc.id;
        data.push(docData);
    });
    return data;
  };

  const getUsersData1 = async () => {

    const dataCollection = collection(db, 'users');
    const querySnapshot = await getDocs(dataCollection);
    const data = [];
    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        docData.id = doc.id;
        data.push(docData);
    });
    return data;
  };
  
  export default getUsersData;


