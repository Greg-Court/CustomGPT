import { db } from '../config/firebase';
import { addDoc, collection, serverTimestamp, getDocs, doc, getDoc } from 'firebase/firestore';

export const createNewChat = async (uid: string) => {
  const chatsCollectionRef = collection(db, 'users', uid, 'chats')
  const doc = await addDoc(chatsCollectionRef, {
    messages: [],
    createdAt: serverTimestamp(),
  });
  console.log("NewChatDoc:" + doc);
  return doc.id;
};

export const getChatList = async (uid: string) => {
  const chatsCollectionRef = collection(db, 'users', uid, 'chats')
  const data = await getDocs(chatsCollectionRef);
  return data;
}

export const getChat = async (userUid: string,chatUid: string) => {
  const chatRef = doc(db, 'users', userUid, 'chats', chatUid);
  const chat = await getDoc(chatRef);
  return chat;
}