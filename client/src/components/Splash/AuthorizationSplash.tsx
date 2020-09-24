import React from 'react';
import { AUTHORIZATION_URL } from '../../constants';

const launchAuthorization = () => {
  document.location.href = AUTHORIZATION_URL;
};

const AuthorizationSplash: React.FunctionComponent = () => (
  <div className="AuthorizationSplash">
    <h1 className="AuthorizationSplash__headline">Remote Party</h1>
    <section>
      <p>
        <em>Listen to music, together, but remotely.</em>
      </p>
      In order to use this app:
      <ul>
        <li>Authorize this site to play audio with user interaction.</li>
        <li>
          Authorize this app to control your spotify account:
          <br />
          <button type="button" onClick={() => launchAuthorization()}>
            authorize
          </button>
        </li>
      </ul>
    </section>
  </div>
);

export default AuthorizationSplash;
