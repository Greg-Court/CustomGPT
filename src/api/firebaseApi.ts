import { db } from '../config/firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

export const createNewChat = async (uid: string) => {
  const chatsCollectionRef = collection(db, 'users', uid, 'chats');
  const doc = await addDoc(chatsCollectionRef, {
    messages: [],
    createdAt: serverTimestamp(),
  });
  console.log('NewChatDoc:' + doc);
  return doc.id;
};

export const getChatList = async (uid: string) => {
  const chatsCollectionRef = collection(db, 'users', uid, 'chats');
  const data = await getDocs(chatsCollectionRef);
  return data;
};

export const getChat = async (userUid: string, chatUid: string) => {
  const chatRef = doc(db, 'users', userUid, 'chats', chatUid);
  const chat = await getDoc(chatRef);
  return chat;
};

export const deleteChat = async (userUid: string, chatUid: string) => {
  const chatRef = doc(db, 'users', userUid, 'chats', chatUid);
  await deleteDoc(chatRef);
};

export const getMessages = async (userUid: string, chatUid: string) => {
  const messagesRef = collection(
    db,
    'users',
    userUid,
    'chats',
    chatUid,
    'messages'
  );
  const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'));
  const messagesData = await getDocs(messagesQuery);
  return messagesData;
};

export const sendMessage = async (
  userUid: string,
  chatUid: string,
  message: string
) => {
  const messagesRef = collection(
    db,
    'users',
    userUid,
    'chats',
    chatUid,
    'messages'
  );
  const newMessage = {
    message,
    uid: userUid,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(messagesRef, newMessage);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot;
};
