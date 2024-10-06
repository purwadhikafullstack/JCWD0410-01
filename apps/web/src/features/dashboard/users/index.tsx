'use client'

import DashboardHeader from '@/components/DashboardHeader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'

interface DashboardUserInterface {
  id: number
}

const DashboardUserPage:FC<DashboardUserInterface> = ({id}) => {
  const session = useSession();
  const router = useRouter();

  if (!session.data) {
    return <DashboardHeader />;
  }

  return session.data?.user.role === "ADMIN" ? (
    <>
      <DashboardHeader />
      <div className="text-md md: mx-auto h-full bg-white p-4 pt-24">
        {/* {isPending ? (
          <Loader2 className="mx-auto animate-spin" />
        ) : data?.data ? (
          <>
            <DataTable
              columns={employeesColumns}
              data={data?.data!}
              meta={data.meta}
            />
            <div className="my-4 flex justify-center">
              <Pagination
                total={data?.meta?.total || 0}
                limit={data?.meta?.take || 0}
                onChangePage={onChangePage}
                page={page}
              />
            </div>
          </>
        ) : (
          <DataTable
            columns={employeesColumns}
            data={[]}
            meta={{ page: 1, take: 8, total: 0 }}
          />
        )} */}
      </div>
    </>
  ) : (
    <>
      <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]"></nav>
      <div className="md: mx-auto h-full bg-white p-4 pt-24 text-xl font-bold">
        <>{router.push("/dashboard")}</>
      </div>
    </>
  );
}

export default DashboardUserPage