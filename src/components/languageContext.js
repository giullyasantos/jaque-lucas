import React, { createContext, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => (
  <LanguageContext.Provider value={{ language: 'pt' }}>
    {children}
  </LanguageContext.Provider>
);

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
