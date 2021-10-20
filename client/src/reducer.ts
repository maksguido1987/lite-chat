import { IInitialState, TAction } from './types';

export const initialState: IInitialState = {
  joined: false,
  roomID: null,
  userName: null,
  users: [],
  messages: [],
};

export const reducer = (state: IInitialState, action: TAction) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: action.joined,
        roomID: action.roomID,
        userName: action.userName,
      };
    case 'SET_USERS':
      return {
        ...state,
        users: [...action.user],
      };
    case 'NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages ,action.message],
      };
    case 'SET_DATA':
      return {
        ...state,
        users: action.users,
        messages: action.messages,
      };
    default:
      return state;
  }
};
