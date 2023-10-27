import { ChatRoom } from "@/app/shared/interface/chat";
import { SignIn } from "@/app/shared/interface/login";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3333",
});

//user - login
export const signInUser = (data: SignIn) => API.post("/signin", data);
export const getUser = (id: string) => API.get("/user", { params: { id } });

// room
export const getRooms = () => API.get("/rooms");
export const createRoom = (data: ChatRoom) => API.post("/create/room", data);
