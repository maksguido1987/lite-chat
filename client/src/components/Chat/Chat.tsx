import React from 'react';
import { TChatProps } from '../../types';
import socket from '../../socket';

const Chat: React.FC<TChatProps> = ({ users, messages, userName, roomID, onAddMessage }) => {
  const [messageValue, setMessageValue] = React.useState<string>();
  const messagesRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesRef.current?.scrollTo(0, 99999);
  }, [messages]);

  const onMessageValue = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setMessageValue(value);
  };

  const onSendMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomID,
      text: messageValue,
    });
    if (userName) {
      onAddMessage({
        userName,
        text: messageValue,
      });
    }
    setMessageValue('');
  };

  return (
    <div className="chat">
      <div className="chat-users">
        <b>Комната {roomID}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index} className="chat-user">
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages" ref={messagesRef}>
          {messages.map((message, index) => (
            <div className="message" key={new Date().toString() + index}>
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form className="chat-form">
          <textarea
            value={messageValue}
            onChange={onMessageValue}
            className="form-control"
          ></textarea>
          <button onClick={onSendMessage} className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
