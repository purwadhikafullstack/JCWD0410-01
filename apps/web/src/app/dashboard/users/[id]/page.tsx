import DashboardUserPage from '@/features/dashboard/users'
import React from 'react'

const DashboardUserDetail = ({ params }: { params: { id: number } }) => {
  return (
    <DashboardUserPage id={params.id}/>
  )
}

export default DashboardUserDetail