// context.js
import React, { createContext, useState } from 'react';

const IsFeatureEnabledContext = createContext(true);

const IsFeatureEnabledProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleEnabled = () => setIsEnabled(!isEnabled);

  return (
    <IsFeatureEnabledContext.Provider value={{ isEnabled, toggleEnabled }}>
      {children}
    </IsFeatureEnabledContext.Provider>
  );
};

export { IsFeatureEnabledContext, IsFeatureEnabledProvider };
