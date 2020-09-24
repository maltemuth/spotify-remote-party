import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { detectIdentity } from './model/identity/detectIdentity';

ReactDOM.render(
  <App identity={detectIdentity()} />,
  document.getElementById('app-root')
);
