import { WebPlaybackState } from './WebPlaybackState';

/* eslint-disable-next-line import/prefer-default-export */
export declare class Player {
  _options: {
    getOAuthToken: (_: (token: string) => void) => void;
    id: string;
  };

  connect: () => Promise<void>;

  disconnect: () => Promise<void>;

  pause: () => Promise<void>;

  resume: () => Promise<void>;

  togglePlay: () => Promise<void>;

  getCurrentState: () => Promise<WebPlaybackState>;

  setName: (name: string) => Promise<void>;

  getVolume: () => Promise<number>;

  setVolume: (volume: number) => Promise<void>;

  seek: (milliseconds: number) => Promise<void>;

  previousTrack: () => Promise<number>;

  nextTrack: () => Promise<number>;

  addListener: {
    (
      eventName: 'ready' | 'not_ready',
      /* eslint-disable-next-line camelcase */
      handler: ({ device_id }: { device_id: string }) => void
    ): boolean;
    (
      eventName: 'player_state_changed',
      handler: (state: WebPlaybackState) => void
    ): boolean;
    (
      eventName:
        | 'initialization_error'
        | 'authentication_error'
        | 'account_error'
        | 'playback_error',
      handler: ({ message }: { message: string }) => void
    ): boolean;
  };

  removeListener: {
    (
      eventName: 'ready' | 'not_ready',
      /* eslint-disable-next-line camelcase */
      handler?: ({ device_id }: { device_id: string }) => void
    ): void;
    (
      eventName: 'player_state_changed',
      handler?: (state: WebPlaybackState) => void
    ): void;
    (
      eventName:
        | 'initialization_error'
        | 'authentication_error'
        | 'account_error'
        | 'playback_error',
      handler?: ({ message }: { message: string }) => void
    ): void;
  };
}
