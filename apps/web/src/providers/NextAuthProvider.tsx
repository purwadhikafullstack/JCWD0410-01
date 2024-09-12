"use client";

import React, { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
