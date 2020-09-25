import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import socketIo, { Socket } from 'socket.io';
import http from 'http';

import { User } from 'spotify-remote-party-library/model/user';
import {
  SocketControllerChangeMessage,
  SocketMessage,
} from 'spotify-remote-party-library/model/SocketMessage';

import generateKey from 'spotify-remote-party-library/generateKey';
import {
  get,
  remove,
  set,
} from 'spotify-remote-party-library/storage/userStore';

const restApi = express();
const httpServer = http.createServer(restApi);
const socketApi = socketIo(httpServer);

const port = parseInt(process.env.PORT || '8000', 10);
const HOST = process.env.HOST || 'http://localhost:8000';

const clientId = process.env.CLIENT_ID || 'ab08bf605a5340ddb4c81a429a695028';
const clientSecret = process.env.CLIENT_SECRET;

const redirectUri = `${HOST}/receive`;

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:1234/';
const FRONTEND_ORIGIN = new URL(FRONTEND_URL).origin;

let currentControllerId: string | null = null;
const socketsByUserId: { [id: string]: Socket } = {};

const authorizationUrl = (): string => {
  const scopes = [
    'streaming',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-email',
    'user-read-private',
  ];

  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scopes.join(',')}`;
  return url;
};

restApi.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);

restApi.get('/authorize', (_, response) => {
  response.redirect(authorizationUrl());
});

const formEncode = (body: { [key: string]: string }): string => {
  return Object.entries(body)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
};

restApi.get('/receive', (request, response) => {
  const authorizationCode = request.query.code;
  const body = formEncode({
    grant_type: 'authorization_code',
    code: authorizationCode as string,
    redirect_uri: redirectUri,
  });
  let token: string;
  let refreshToken: string;

  const authorizationHeader = `Basic ${Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString('base64')}`;

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: authorizationHeader,
    },
    body,
  })
    .then(apiResponse => apiResponse.json())
    .then(apiData => {
      token = apiData.access_token;
      refreshToken = apiData.refresh_token;
      return fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${apiData.access_token}`,
        },
      });
    })
    .then(profileResponse => profileResponse.json())
    .then(profileData => {
      const key = generateKey();
      const { id, display_name: name } = profileData;
      const newUser: User = {
        id,
        key,
        token,
        refreshToken,
        name,
        authenticated: false,
      };
      set(id, newUser);

      const frontendUrl = new URL(FRONTEND_URL);
      frontendUrl.searchParams.append('id', id);
      frontendUrl.searchParams.append('key', key);

      response.redirect(frontendUrl.toString());
    });
});

restApi.get('/token/:id/:key', (request, response) => {
  const { id, key } = request.params;

  const user = get(id);
  if (!user) {
    response.status(404);
    response.send('No such user.');
    return;
  }

  if (user!.key !== key) {
    response.status(403);
    return;
  }

  response.json({ token: user.token });
});

restApi.post('/logout/:id/:key', (request, response) => {
  const { id, key } = request.params;

  const user = get(id);
  if (user && user.key === key) {
    remove(id);
  }

  response.status(200);
});

socketApi.on('connection', socket => {
  console.log(`${socket.id} connected.`);
  socket.on('message', (message: SocketMessage) => {
    console.log(message, `message from ${socket.id}`);
    switch (message.type) {
      case 'auth': {
        const { id, key } = message.identity;
        const user = get(id);
        if (!user || user.key !== key) {
          console.warn(
            `[AUTH] user supplied invalid credentials or is unknown.`
          );
          return;
        }
        console.log(
          `[AUTH] user supplied valid credentials and is now authorized.`
        );
        user.authenticated = true;

        socketsByUserId[id] = socket;
        if (!currentControllerId) {
          currentControllerId = user.id;
          Object.values(socketsByUserId).forEach(broadcasting => {
            broadcasting.emit('message', {
              type: 'controllerChange',
              id: user.id,
            } as SocketControllerChangeMessage);
          });
        } else {
          socket.send({
            type: 'controllerChange',
            id: currentControllerId,
          } as SocketControllerChangeMessage);
        }

        set(id, user);
        return;
      }

      case 'trackUpdate': {
        const { id } = socket;
        const correspondingUserId = Object.keys(socketsByUserId).find(
          key => socketsByUserId[key].id === id
        );

        if (currentControllerId === correspondingUserId) {
          Object.keys(socketsByUserId).forEach(userId => {
            if (userId !== currentControllerId) {
              socketsByUserId[userId].emit('message', message);
            }
          });
        }
        return;
      }

      default: {
        console.warn(`Cannot handle message of type ${message.type}`);
      }
    }
  });
});

httpServer.listen(port, '0.0.0.0', () => {
  /* eslint-disable-next-line no-console */
  console.log(`Remote Party listening at ${port}`);
});
