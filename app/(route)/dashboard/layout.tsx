import { NextPage } from 'next'
import React from 'react'
import { cn } from '@/lib/utils'
import DashboardSidebar from './_partials/DashboardSidebar'

interface Props {
  children: React.ReactNode
}

const DashboardUserLayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <div
        className={cn(
          'mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 md:flex-row',
          'min-h-dvh'
        )}
      >
        <DashboardSidebar />
        {children}
      </div>
    </>
  )
}

export default DashboardUserLayout
