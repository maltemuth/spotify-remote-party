import React from 'react';
import { Identity } from '../model/identity/Identity';
import Session from './Session/Session';
import AuthorizationSplash from './Splash/AuthorizationSplash';

const App: React.FunctionComponent<{ identity: Identity | null }> = ({
  identity,
}) => (
  <div className="App">
    <div className="App__background" />
    <div className="App__content">
      {identity ? <Session identity={identity} /> : <AuthorizationSplash />}
    </div>
  </div>
);

export default App;
