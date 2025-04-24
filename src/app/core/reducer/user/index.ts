import { User } from "@/app/shared/interface/login";
import { SET_USER } from "../../action/actionType";

const initialState: User = { name: "", username: "", _id: "" };

const UserReducer = (
  state = initialState,
  action: { payload: User; type: string }
) => {
  const { type, payload } = action;
  if (type === SET_USER) {
    return { ...state, ...payload };
  } else {
    return state;
  }
};

export default UserReducer;
