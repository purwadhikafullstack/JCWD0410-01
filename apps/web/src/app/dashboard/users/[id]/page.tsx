import React from 'react'

const DashboardUserDetail = ({ params }: { params: { id: number } }) => {
  return (
    <div>DashboardUserDetail {params.id}</div>
  )
}

export default DashboardUserDetail