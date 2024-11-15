import React, { createContext, useContext, useState } from 'react';
import ErrorModal from '../components/modals/ErrorModal';

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const showError = (msg) => setError(msg);
  const hideError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {children}
      {error && <ErrorModal msg={error} onClose={hideError} />}
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}
