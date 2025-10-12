
export interface User {
  email: string;
  name: string;
  credits: number;
}

export enum MessageSender {
    USER = 'user',
    ASSISTANT = 'assistant'
}

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export interface Notification {
    id: string;
    message: string;
    timestamp: string;
    read: boolean;
}
