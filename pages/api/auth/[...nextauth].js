import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

//TODO maybe get rid of next auth, manage session only on API

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@site.com' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials, _req) {
        try {
          const response = await fetch(
            'http://localhost:8000/auth/signin', 
            {
              method: 'POST', 
              headers: {
                'content-type': 'application/json'
              }, 
              body: JSON.stringify(credentials)
            }
          );
          if (response.status === 200) {
            const data = await response.json();
            return {
              username: data.username,
              displayname: data.displayname,
              access_token: data.access_token,
            };
          } else {
            const { error } = await response.json();
            return Promise.reject(new Error(error))
          }
        } catch(e) { 
          return Promise.reject(new Error('Something went wrong please try again later'));
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          username: user.username,
          displayname: user.displayname,
          access_token: user.access_token
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
