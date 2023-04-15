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

// Snapshot: A snapshot represents the current state of a document or a query result in Firestore at the time the snapshot was retrieved. Snapshots are immutable and can contain document data or metadata about the document, such as whether the document exists or the last time it was updated. There are two types of snapshots:
// DocumentSnapshot: Represents the data and metadata of a single document in Firestore.
// QuerySnapshot: Represents the result of a query, including the documents matching the query and metadata about the query.
// Query: A query represents a request to retrieve a set of documents from Firestore based on certain conditions or filters, such as documents with specific field values or documents sorted by a field in a specific order. Queries are constructed using methods like where, orderBy, and limit, which chain together to define the conditions of the query. Once the query is constructed, you can use getDocs() to execute the query and retrieve a QuerySnapshot containing the matching documents.
// Ref: Ref stands for "reference" and is used to point to a specific location within the Firestore database. There are two types of references:
// CollectionReference: Represents a reference to a collection in Firestore. It is used to create, read, update, or delete documents within the collection. You can also use it to construct a query by adding conditions or filters.
// DocumentReference: Represents a reference to a single document within a collection in Firestore. It can be used to read, write, or delete the document or to listen for real-time updates on the document.

export const createChat = async (uid: string, model: string, prompt: string) => {
  const chatsRef = collection(db, 'users', uid, 'chats');
  const newChat = {
    model: model,
    prompt: prompt,
    messages: [],
    createdAt: serverTimestamp(),
  };
  const chatDocRef = await addDoc(chatsRef, newChat);
  console.log('NewChatDoc:' + chatDocRef);
  return chatDocRef.id;
};

export const getChatList = async (uid: string) => {
  const chatsRef = collection(db, 'users', uid, 'chats');
  const chatListSnapshot = await getDocs(chatsRef);
  return chatListSnapshot;
};

export const getChat = async (userUid: string, chatUid: string) => {
  const chatDocRef = doc(db, 'users', userUid, 'chats', chatUid);
  const chatSnapshot = await getDoc(chatDocRef);
  return chatSnapshot;
};

export const deleteChat = async (userUid: string, chatUid: string) => {
  const chatDocRef = doc(db, 'users', userUid, 'chats', chatUid);
  await deleteDoc(chatDocRef);
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
  const messagesSnapshot = await getDocs(messagesQuery);
  return messagesSnapshot;
};

export const sendMessage = async (
  userUid: string,
  chatUid: string,
  role: string,
  messageContent: string,
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
    content: messageContent,
    role: role,
    uid: userUid,
    createdAt: serverTimestamp(),
  };
  const messageDocRef = await addDoc(messagesRef, newMessage);
  const messageSnapshot = await getDoc(messageDocRef);
  return messageSnapshot;
};

export const setChatSystemPrompt = async (
  userUid: string,
  chatUid: string,
  messageContent: string,
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
    content: messageContent,
    role: 'system',
    createdAt: serverTimestamp(),
  };
  const messageDocRef = await addDoc(messagesRef, newMessage);
  const messageSnapshot = await getDoc(messageDocRef);
  return messageSnapshot;
};



export const createPrompt = async (
  userUid: string,
  content: string,
  name: string
) => {
  const promptsRef = collection(db, 'users', userUid, 'prompts');
  const newPrompt = {
    name,
    content,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(promptsRef, newPrompt);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot;
};

export const getPrompts = async (userUid: string) => {
  const promptsRef = collection(db, 'users', userUid, 'prompts');
  const promptsQuery = query(promptsRef);
  const promptsSnapshot = await getDocs(promptsQuery);
  return promptsSnapshot;
};

export const getPrompt = async (userUid: string, promptUid: string) => {
  const promptRef = doc(db, 'users', userUid, 'prompts', promptUid);
  const promptSnapshot = await getDoc(promptRef);
  return promptSnapshot;
};
