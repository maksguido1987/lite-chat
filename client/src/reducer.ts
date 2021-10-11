export const initialState: IInitialState = {
  joined: false,
  roomID: null,
  userName: null,
}

export const reducer = (state: TInitialState, action: TAction) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
      };
    default:
      return state;
  }
};

export type TInitialState = typeof initialState;

export interface IInitialState {
  joined: boolean,
  roomID: string | null,
  userName: string | null,
}

export type TAction = { type: 'JOINED', joined: boolean };

