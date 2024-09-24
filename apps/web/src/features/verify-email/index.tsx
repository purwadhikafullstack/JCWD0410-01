"use client";

import { Button } from "@/components/ui/button";
import useVerifyEmail from "@/hooks/api/user/useVerifyEmail";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { SpinnerCircularFixed } from "spinners-react";

interface VerifyEmailPageProps {
  token: string;

  email: string;
}

const VerifyEmailPage: FC<VerifyEmailPageProps> = ({ token, email }) => {
  const { mutateAsync: verifyEmail, isPending } = useVerifyEmail();

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail({
        email: email, // Replace with the actual email you want to verify
        token: token,
      });
    } catch (error) {
      console.error("Verification failed", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-80 flex-col items-center justify-center gap-6 rounded-md border-[1px] p-6 text-sm">
        <div className="relative h-40 w-full">
          <Image
            src="/email.png"
            alt="Email Logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-center text-neutral-500">
          Please verify your email by clicking the button below
        </p>
        <div className="w-full text-center">
          <Button
            disabled={isPending}
            type="submit"
            onClick={handleVerifyEmail}
            className="w-[80%]"
          >
            {" "}
            {isPending ? (
              <div className="flex items-center gap-1">
                <SpinnerCircularFixed size={20} />
                <p className="text-sm">Loading</p>
              </div>
            ) : (
              "Verify Now"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
