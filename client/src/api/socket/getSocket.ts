import io from 'socket.io-client';

import { SocketAuthenticationMessage } from 'spotify-remote-party-library/model/SocketMessage';

import { BACKEND_URL } from '../../constants';
import { detectIdentity } from '../../model/identity/detectIdentity';

let client: ReturnType<typeof io.connect>;

const getSocket = () => {
  if (!client) {
    client = io.connect(BACKEND_URL, detectIdentity()!);
    client.on('connect', () =>
      client.send({
        type: 'auth',
        identity: detectIdentity(),
      } as SocketAuthenticationMessage)
    );
  }

  return client;
};

export default getSocket;
