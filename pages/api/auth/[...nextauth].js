import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

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
            'http://localhost:8000/auth/login', 
            {
              method: 'POST', 
              headers: {
                'content-type': 'application/json'
              }, 
              body: JSON.stringify(credentials)
            }
          );
          const data = await response.json()
          const user = {
            name: data.user,
            access_token: data.access_token
          }
          if (user) {
            return user
          }

          return null;
          // return data.email;
        } catch(e) { 
          // console.log(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.data) {
        session.user = token.data;
        session.maxAge = 300;
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
