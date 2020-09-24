import { Identity } from './identity/Identity';

export interface SocketAuthenticationMessage {
  type: 'auth';
  identity: Identity;
}

export interface SocketControllerChangeMessage {
  type: 'controllerChange';
  id: string;
}

export interface SocketTrackUpdateMessage {
  type: 'trackUpdate';
  uri: string;
  position: number;
}

export type SocketMessage =
  | SocketAuthenticationMessage
  | SocketControllerChangeMessage
  | SocketTrackUpdateMessage;
