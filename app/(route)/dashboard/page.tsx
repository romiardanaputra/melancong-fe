'use client'
import { NextPage } from 'next'
import { useState } from 'react'
import DashboardSidebar from '@/app/(route)/dashboard/partials/DashboardSidebar'
import DashboardDestination from '@/app/(route)/dashboard/partials/DashboardDestination'
import useDestinations from '@/app/hooks/useDestinations'

interface Props {}

const DashboardPage: NextPage<Props> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [locationFilter, setLocationFilter] = useState<string>('')
  const [destinationTypeFilter, setDestinationTypeFilter] = useState<string>('')
  const { destinations, fetchDestinations } = useDestinations()
  const [filterSubmitted, setFilterSubmitted] = useState(false)

  const handleFilterSubmit = () => {
    fetchDestinations(searchQuery, locationFilter, destinationTypeFilter)
    setFilterSubmitted(true)
  }

  const handleFilterReset = () => {
    setSearchQuery('')
    setLocationFilter('')
    setDestinationTypeFilter('')
    fetchDestinations()
    setFilterSubmitted(false)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    fetchDestinations(query)
    setFilterSubmitted(true)
    setSearchQuery('')
  }

  return (
    <>
      <div className='w-full'>
        <div className='flex'>
          <DashboardSidebar
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            destinationTypeFilter={destinationTypeFilter}
            setDestinationTypeFilter={setDestinationTypeFilter}
            handleFilterSubmit={handleFilterSubmit}
            handleFilterReset={handleFilterReset}
          />
          <DashboardDestination
            destinations={destinations}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            filterSubmitted={filterSubmitted}
          />
        </div>
      </div>
    </>
  )
}

export default DashboardPage
