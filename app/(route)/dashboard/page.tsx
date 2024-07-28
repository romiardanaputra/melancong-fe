'use client'
import { NextPage } from 'next'
import DashboardDestination from './partials/DashboardDestination'
import { useState } from 'react'
import useDestinations from '@/app/hooks/useDestinations'

interface Props {}

const DashboardPage: NextPage<Props> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [locationFilter] = useState<string>('')
  const [destinationTypeFilter] = useState<string>('')
  const { destinations, fetchDestinations } = useDestinations()
  const [filterSubmitted, setFilterSubmitted] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    fetchDestinations(query, locationFilter, destinationTypeFilter)
    setFilterSubmitted(true)
  }
  return (
    <>
      <div className='w-full'>
        <DashboardDestination
          destinations={destinations}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          filterSubmitted={filterSubmitted}
        />
      </div>
    </>
  )
}

export default DashboardPage
