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
            console.log('we got here');
            const data = await response.json();
            // const user = {
            //   username: data.username,
            //   displayname: data.displayname,
            //   access_token: data.access_token,
            // };
            return {
              username: data.username,
              displayname: data.displayname,
              access_token: data.access_token,
            };
          }
          return Promise.reject(new Error('Wrong email or password'))
        } catch(e) { 
          console.log(e);
          return null;
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
