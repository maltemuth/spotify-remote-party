import React from 'react';

const ApiContext: React.Context<{}> = React.createContext({});

const ApiWrapper: React.FunctionComponent<{}> = ({ children }) => {
  return <ApiContext.Provider value={{}}>{children}</ApiContext.Provider>;
};

export default ApiWrapper;

export { ApiContext };
