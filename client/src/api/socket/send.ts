import { SocketMessage } from 'spotify-remote-party-library/model/SocketMessage';
import getSocket from './getSocket';

const send = (message: SocketMessage) => {
  const socket = getSocket();
  socket.send(message);
};

export default send;
