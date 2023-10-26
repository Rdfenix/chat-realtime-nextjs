import { SignIn } from "@/app/shared/interface/login";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3333",
});

export const signInUser = (data: SignIn) => API.post("/signin", data);
export const getUser = (id: string) => API.get("/user", { params: { id } });
