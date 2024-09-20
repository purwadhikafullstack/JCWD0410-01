import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { axiosInstance } from "./axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
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
    async signIn({ account, user }: any) {
      if (account.provider === "google") {
        const accessToken = account?.access_token;
        console.log("Google Access Token:", accessToken);

        const { data } = await axiosInstance.post("/auth/login/google", {
          accessToken,
        });

        user.id = data.data.id;
        user.name = data.data.name;
        user.profilePicture = data.data.profilePicture;
        user.role = data.data.role;
        user.provider = data.data.provider;
        user.token = data.token;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
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
