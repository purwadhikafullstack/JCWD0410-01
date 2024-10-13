"use client";

import DashboardHeader from "@/components/DashboardHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const session = useSession();
  const router = useRouter();
  if (!session.data) {
    return (
      <>
        <DashboardHeader />
        <div className="md: mx-auto h-full bg-white p-4 text-xl font-bold">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl"></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </>
    );
  }
  if (
    session.data?.user.role === "ADMIN" ||
    session.data?.user.role === "OUTLET_ADMIN"
  ) {
    router.push("/dashboard/earnings");
  }

  if (session.data.user.role === "WORKER") {
    router.push("/dashboard/work-orders");
  }

  if (session.data.user.role === "DRIVER") {
    router.push("/dashboard/pickup-orders");
  }
};

export default DashboardPage;
