import { ChatRoom } from "./chat";
import { Dictionary } from "./dictionary";
import { User } from "./login";

export interface StateReducer {
  ValidateUserReducer: boolean;
  UserReducer: User;
  ChatRoomsReducer: ChatRoom[];
  ChatSingleRoomReducer: Dictionary<ChatRoom>;
}
