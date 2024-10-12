'use client'

import DashboardHeader from '@/components/DashboardHeader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import DashboardWorkOrdersWorkerPage from './workers';
import DashboardWorkOrdersAdminsPage from './admins';

const DashboardWorkOrdersPage = () => {
  const session = useSession();
  const router = useRouter();

  if (!session.data) {
    return <DashboardHeader />;
  }

  if (session.data.user.role === "WORKER") {
    return <DashboardWorkOrdersWorkerPage />;
  } else if (session.data.user.role === "ADMIN" || session.data.user.role === "OUTLET_ADMIN") {
    return <DashboardWorkOrdersAdminsPage />
  } else {
    return (
      <>
        <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]"></nav>
        <div className="md: mx-auto h-full bg-white p-4 pt-24 text-xl font-bold">
          <>{router.push("/dashboard")}</>
        </div>
      </>
    );
  }
}

export default DashboardWorkOrdersPage