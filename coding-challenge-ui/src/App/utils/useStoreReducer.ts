import { ReducerAction, ReducerState, ACTION } from "../types/types";

export const initialState: ReducerState = {
  loggedInUser: null,
};

const Reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case ACTION.SET_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
