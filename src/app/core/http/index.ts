import { ChatRoom } from "@/app/shared/interface/chat";
import { SignIn, SignUp } from "@/app/shared/interface/login";
import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

//user - login
export const signInUser = (data: SignIn) => API.post("/signin", data);
export const getUser = (id: string) => API.get("/user", { params: { id } });

//user - create
export const createUser = (data: SignUp) => API.post("/create/user", data);

// room
export const getRooms = () => API.get("/rooms");
export const getRoom = (_id: string) => API.get("/room", { params: { _id } });
export const createRoom = (data: ChatRoom) => API.post("/create/room", data);
export const deleteRoom = (_id: string) =>
  API.delete("/delete/room", { params: { _id } });
