import { NextPage } from 'next'
import React from 'react'
import Sidebar from '@/app/(route)/dashboard/partials/DashboardSidebar'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
}

const DashboardUserLayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <div
        className={cn(
          'mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 md:flex-row',
          'min-h-dvh'
        )}
      >
        <Sidebar />
        {children}
      </div>
    </>
  )
}

export default DashboardUserLayout
