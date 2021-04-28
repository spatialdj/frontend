import React, { createContext, useState } from 'react';

/**
 * Stores client position to allow client based proximity audio
 */
export const ClientPositionContext = createContext();

export const ClientPositionProvider = props => {
  const [clientPosition, setClientPosition] = useState({ x: 0, y: 0 });

  return (
    <ClientPositionContext.Provider
      value={{ clientPosition, setClientPosition }}
    >
      {props.children}
    </ClientPositionContext.Provider>
  );
};
