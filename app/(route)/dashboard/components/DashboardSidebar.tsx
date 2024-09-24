'use client'

import React, { useState } from 'react'

import {
  Sidebar,
  SidebarBody,
  SidebarLink
} from '@/components/ui/navigation/SideBarAnimate'
import LogoIcon from '@/app/(route)/dashboard/components/LogoIcon'
import Logo from '@/app/(route)/dashboard/components/Logo'
import { sidebarLinks } from '@/data/sidebar-link'
import useLogout from '@/hooks/useLogout'

const DashboardSidebar = () => {
  const [open, setOpen] = useState(false)
  const { handleLogout } = useLogout()

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {sidebarLinks.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={
                    link.label === 'Logout'
                      ? { ...link, onClick: handleLogout }
                      : link
                  }
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </>
  )
}

export default DashboardSidebar
