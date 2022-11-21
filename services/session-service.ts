import { IncomingMessage, ServerResponse } from "http";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const getSession = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const sessionCookie = getCookie('session', { req, res });
  const csrfTokenCookie = getCookie('csrf_token', { req, res });
  try {
    const response = await fetch('http://localhost:8000/auth/session', {
      method: 'get',
      headers: {
        Cookie: `session=${sessionCookie}; csrfToken=${csrfTokenCookie}`,
      },
    });
    if (response.status === 200) {
      const user = await response.json();
      return user;
    }
    return null; 
  } catch(e) {
    return null;
  }
};

export const setSession = (data: any, expires: number) => {
  setCookie('session', data, {maxAge: expires} )
}

export const deleteSession = (req?: IncomingMessage, res?: ServerResponse<IncomingMessage>) => {
  deleteCookie('session', {req, res});
};