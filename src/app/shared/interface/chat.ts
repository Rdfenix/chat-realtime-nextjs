import { Dictionary } from "./dictionary";

export interface ChatRoom {
  _id?: string;
  username: string;
  title: string;
}

export interface ChatMessage {
  _id: string;
  userName: string;
  message: string;
}

export interface Room {
  rooms: ChatRoom[],
  messages: Dictionary<ChatMessage[]>
}