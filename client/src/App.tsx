import React, { useReducer } from 'react';
import JoinForm from './components/JoinForm/JoinForm';
import { TAction, IInitialState, initialState, reducer } from './reducer';
import socket from './socket';
import './styles.scss';

export const App = () => {
  const [state, dispatch] = useReducer<React.Reducer<IInitialState, TAction>>(reducer, initialState);

  const onLogin = (obj: IDataRoom) => {
    dispatch({
      type: 'JOINED',
      joined: true,
    });
    socket.emit('ROOM:JOIN', obj);
  };

  return <>{!state.joined && <JoinForm onLogin={onLogin} />}</>;
};

export default App;

export interface IDataRoom {
  roomID: string;
  userName: string;
}
