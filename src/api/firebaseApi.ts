import { db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const createNewChat = async (uid: string) => {
  const doc = await addDoc(collection(db, 'users', uid, 'chats'), {
    messages: [],
    createdAt: serverTimestamp(),
  });
  return doc.id;
};