export interface IInitialState {
  joined?: boolean;
  roomID: string | null;
  userName: string | null;
  users: Array<string>;
  messages: Array<IMessage>;
}

interface IJoined {
  type: 'JOINED';
  joined?: boolean;
  roomID: string | null;
  userName: string | null;
}

interface ISetUsers {
  type: 'SET_USERS';
  user: string;
}

interface ISetMessages {
  type: 'NEW_MESSAGE';
  message: IMessage;
}

interface ISetData {
  type: 'SET_DATA';
  users: Array<string>;
  messages: Array<IMessage>;
}

export type TAction = IJoined | ISetUsers | ISetMessages | ISetData;

export interface IJoinFormProps {
  onLogin: (baseData: IDataRoom) => void;
}

interface IAddMessage {
  onAddMessage: (data: IMessage) => void;
}

export type TChatProps = IInitialState & IAddMessage;

export interface IDataRoom {
  joined?: boolean;
  roomID: string;
  userName: string;
}

export interface IMessage {
  text?: string;
  userName: string;
}
