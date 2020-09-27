import { SocketMessage } from 'spotify-remote-party-library/model/SocketMessage';
import getSocket from './getSocket';

/**
 * sends the given message to the backend via the global socket
 * @param message
 */
const send = (message: SocketMessage) => {
  const socket = getSocket();
  socket.send(message);
};

export default send;
