import React, { useEffect, useState } from 'react';
import { Identity } from 'spotify-remote-party-library/model/identity/Identity';
import {
  SocketMessage,
  SocketTrackUpdateMessage,
} from 'spotify-remote-party-library/model/SocketMessage';
import getPlayer from '../../api/getPlayer';
import getProfile from '../../api/getProfile';
import play from '../../api/player/play';
import stop from '../../api/player/stop';
import { Profile } from '../../api/Profile';
import { WebPlaybackState } from '../../api/WebPlaybackState';
import SongList from './SongList/SongList';
import ApiWrapper from './Api/Api';
import Navbar from './Navbar/Navbar';
import Player from './Player/Player';
import getSocket from '../../api/socket/getSocket';
import send from '../../api/socket/send';

const Session: React.FunctionComponent<{ identity: Identity }> = ({
  identity,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [uri, setUri] = useState<string | undefined>(undefined);
  useEffect(() => {
    getProfile(identity).then(setProfile);
  }, []);

  const [controller, setController] = useState<string | null>(null);

  useEffect(() => {
    const client = getSocket();

    const messageHandler = (message: SocketMessage) => {
      console.log(message, 'message received');
      switch (message.type) {
        case 'controllerChange': {
          const newController = message.id;
          setController(newController);
          return;
        }
        case 'trackUpdate': {
          if (controller !== identity.id) {
            const newUri = message.uri;
            getPlayer().then(player => {
              player.getCurrentState().then(state => {
                const currentUri = state?.track_window.current_track.uri;
                if (newUri && currentUri !== newUri) {
                  play(newUri);
                }
              });
            });
          }
          return;
        }
        default: {
          console.warn(`Cannot handle message of type ${message.type}`);
        }
      }
    };
    client.on('message', messageHandler);

    return () => {
      client.removeEventListener('message', messageHandler);
    };
  }, [controller]);

  const [playbackState, setPlaybackState] = useState<WebPlaybackState | null>(
    null
  );

  useEffect(() => {
    let stateUpdateInterval: ReturnType<typeof setInterval>;
    getPlayer().then(retrievedPlayer => {
      stateUpdateInterval = setInterval(() => {
        retrievedPlayer.getCurrentState().then(state => {
          if (state) {
            setPlaybackState(state);
            const { position } = state;
            const currentUri = state.track_window.current_track.uri;
            if (controller === identity.id) {
              send({
                type: 'trackUpdate',
                position,
                uri: currentUri,
              } as SocketTrackUpdateMessage);
            }
          }
        });
      }, 1000);
    });
    return () => {
      clearInterval(stateUpdateInterval);
    };
  }, [controller]);
  useEffect(() => {
    if (uri) {
      play(uri);
    }
  }, [uri]);
  return (
    <ApiWrapper>
      <div className="Session">
        <Navbar profile={profile} controller={controller} />
        <section>
          <Player
            playbackState={playbackState}
            onPlay={() => uri && play(uri)}
            onPause={() => stop()}
          />
        </section>
        <section>
          <SongList onTrackSelected={newUri => setUri(newUri)} />
        </section>
      </div>
    </ApiWrapper>
  );
};

export default Session;
