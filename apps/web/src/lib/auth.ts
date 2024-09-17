import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(user) {
        if (user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, //2hour
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});
