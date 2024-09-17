"use client";
import CompleteRegisterPage from "@/features/register/CompleteRegister";
import TokenExpired from "@/features/register/TokenExpired";
import useGetEmail from "@/hooks/api/auth/useGetEmail";
import { useSession } from "next-auth/react";
import React from "react";

const CompleteRegister = ({ params }: { params: { token: string } }) => {
  const { data } = useGetEmail(params.token);

  return data?.message === "token expired" ? (
    <TokenExpired />
  ) : (
    data?.email && (
      <CompleteRegisterPage email={data?.email} token={params.token} />
    )
  );
};

export default CompleteRegister;
