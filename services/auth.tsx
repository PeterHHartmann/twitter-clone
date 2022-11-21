import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { IncomingMessage } from 'http';

interface IAuthContext {
  token: string | null;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  authenticated: false,
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  return <AuthContext.Provider value={{ token, authenticated: !!token }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const getToken = async (req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }) => {
  const token = req.cookies.session;
  return token ? token : null;
};

export const getSession = async (req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }) => {
  const token = req.cookies.session;
  if (!token) return null;
  const response = await fetch('http://127.0.0.1:8000/auth/session', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const session = await response.json();
  return session;
};
