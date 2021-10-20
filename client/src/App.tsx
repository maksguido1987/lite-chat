import React from 'react';
import axios from 'axios';
import Chat from './components/Chat/Chat';
import JoinForm from './components/JoinForm/JoinForm';
import { initialState, reducer } from './reducer';
import socket from './socket';
import './styles.scss';
import { IDataRoom, IInitialState, IMessage, TAction } from './types';

export const App = () => {
  const [state, dispatch] = React.useReducer<React.Reducer<IInitialState, TAction>>(reducer, initialState);

  const onLogin = async (baseData: IDataRoom) => {
    dispatch({
      type: 'JOINED',
      joined: true,
      roomID: baseData.roomID,
      userName: baseData.userName,
    });
    socket.emit('ROOM:JOIN', baseData); // сокет запрос от клиента
    const { data } = await axios.get(`http://localhost:5002/rooms/${baseData.roomID}`);
    dispatch({
      type: 'SET_DATA',
      users: data.users,
      messages: data.messages,
    })
  };

  const setUsers = (user: string) => {
    dispatch({
      type: 'SET_USERS',
      user,
    });
  };

  const addMessage = ({ text, userName }: IMessage) => {
    dispatch({
      type: 'NEW_MESSAGE',
      message: {
        text,
        userName,
      },
    });
  };

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  return <>{!state.joined ? <JoinForm onLogin={onLogin} /> : <Chat {...state} onAddMessage={addMessage} />}</>;
};

export default App;
