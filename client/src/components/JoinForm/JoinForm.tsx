import React from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { IJoinFormProps } from '../../types';

const JoinForm: React.FC<IJoinFormProps> = ({ onLogin }) => {
  const [roomID, setRoomID] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const handlerUserNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserName(value);
  };

  const handlerRoomIDValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRoomID(value);
  };

  const onEnter = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!roomID || !userName) alert('Вы ввели неверные данные!');
    setLoading(true);
    const baseData = {
      roomID,
      userName,
    };
    await axios.post('http://localhost:5002/rooms', baseData);
    onLogin(baseData);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Room ID"
          value={roomID}
          onChange={handlerRoomIDValue}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={handlerUserNameValue}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onEnter}>
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </Form>
  );
};

export default JoinForm;
