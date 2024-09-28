import Link from 'next/link'
import React from 'react'

const NavbarDashboard = () => {
  return (
    <nav className="bg-white shadow-sm p-3 top-0 w-full h-12 z-50 flex justify-between rounded-2xl text-center">
      <div>Create Event</div>
      <div className='flex items-center justify-start space-x-2'>
        <span>
          <img
              src="/tixLogo300.png"
              alt="Description"
              className="w-40 object-cover"
            />
        </span>
        <span>kiri ini fotoprofil  iniNama</span>
      </div>
    </nav>
  )
}

export default NavbarDashboard