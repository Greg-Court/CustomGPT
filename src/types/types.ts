import { Timestamp } from 'firebase/firestore';

export interface Chat {
  id: string;
  createdAt: Timestamp;
  messages: Array<Message>;
}

export interface Message {
  message: string;
  uid: string;
  createdAt: Timestamp;
}