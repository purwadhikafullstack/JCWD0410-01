'use client'

import React, { useState } from 'react'
import NotificationHeader from './components/NotificationHeaders'
import useGetNotifications from '@/hooks/api/notifications/useGetNotifications';
import { DataTable } from '@/components/DataTable';
import { notificationsColumns } from './components/NotificationsColumns';

const DashboardNotificationPage = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { data, isPending, refetch } = useGetNotifications({
    page,
    take: 8,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: searchValue,
    unRead: "",
  });
  return (
    <>
    <NotificationHeader />
    <div className="text-md md: mx-auto h-full bg-white p-4 pt-24">
      Notif
      <>
      {isPending ? <div>Data fetching</div> : (
        data?.data ?
        <DataTable columns={notificationsColumns} data={data.data} meta={data.meta} />
         : <DataTable columns={notificationsColumns} data={[]} meta={{page: 1, take: 8, total: 0}} />
      )}
    </>
    </div>
  </>
  )
}

export default DashboardNotificationPage