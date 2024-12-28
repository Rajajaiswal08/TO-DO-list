import React, { createContext } from 'react';

const context = createContext();

function MainContext(props) {
  return (
    <context.Provider value={{}}>
      {props.children}
    </context.Provider>
  );
}

export default MainContext;
