
import { collection, doc, deleteDoc, onSnapshot, getDoc, query, getDocs, where } from 'firebase/firestore'

import { db } from "../firebase";


const getSubscriptionData = async () => {

    const dataCollection = collection(db, 'tutors-subscription');
    const querySnapshot = await getDocs(dataCollection);
    const data = [];
    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        docData.id = doc.id;
        data.push(docData);
    });
    return data;
  };
  
  export default getSubscriptionData;