import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

interface IAuthContext {
  token: string | null;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  authenticated: false,
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  return <AuthContext.Provider value={{ token, authenticated: !!token }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};
