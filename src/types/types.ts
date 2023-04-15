import { Timestamp } from 'firebase/firestore';

export interface Prompt {
  name: string;
  content: string;
}

export interface Chat {
  id: string;
  createdAt: Timestamp;
  messages: Array<Message>;
  prompt: Prompt;
  model: string;
}

export interface Message {
  message: string;
  uid: string;
  createdAt: Timestamp;
}