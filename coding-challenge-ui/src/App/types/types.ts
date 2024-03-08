export enum ACTION {
  SET_USER = "set_user",
}

export type ReducerAction = {
  type: ACTION;
  payload: any;
};

export type ReducerState = {
  loggedInUser: User | null;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
};
