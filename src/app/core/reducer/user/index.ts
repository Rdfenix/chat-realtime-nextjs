const initialState: any = { name: "", user: "" };

const UserReducer = (
  state = initialState,
  action: { payload: any; type: string }
) => {
  const { type, payload } = action;
  switch (type) {
    case "Test":
      return initialState;
    default:
      return state;
  }
};

export default UserReducer;
