'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { PlaceholdersAndVanishInput } from '@/components/ui/input/placeholders-and-vanish-input'
import { inputSearchPlaceholders } from '@/data'
import CustomCard from '@/components/ui/card/CustomCard'
import { IconFilter } from '@tabler/icons-react'
import Filter from '@/components/ui/Filter'
import useFilter from '@/hooks/useFilter'
import withAuth from '@/app/withAuth'
import useFetchDestination from '@/hooks/destinations/useFetchDestination'
import useHandleToggleSave from '@/hooks/destinations/useHandleToggleSave'

const DashboardContent = () => {
  const router = useRouter()
  const { loading, error } = useFetchDestination()
  const { handleToggleSave, savedDestinations } = useHandleToggleSave()
  const {
    handleFilterReset,
    handleFilterSubmit,
    setIsOpen: setIsSidebarOpen,
    isOpen: isSidebarOpen,
    location: locationFilter,
    setLocation: setLocationFilter,
    filterType: destinationTypeFilter,
    setFilterType: setDestinationTypeFilter,
    destinations,
    handleSearch,
    searchQuery,
    isFilterSubmit: filterSubmitted
  } = useFilter()
  const handleFilterClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleCardClick = (id: string) => {
    router.push(`/destinations/${id}`)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleSearch(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    if (event.key === 'Enter') {
      handleCardClick(id)
    }
  }

  return (
    <>
      <div className='w-full'>
        <div className='flex'>
          <div className='size-full bg-neutral-100'>
            <div className='flex h-full min-h-dvh w-full flex-1 flex-col gap-2 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900 md:p-10 md:pl-28 md:pr-16'>
              <div className='flex items-center gap-4 py-4'>
                <PlaceholdersAndVanishInput
                  placeholders={inputSearchPlaceholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                />
                <button
                  type='button'
                  aria-label='filter button'
                  className='flex items-center gap-2 rounded-full bg-cyan-800 px-4 py-3 text-sm font-medium text-white'
                  onClick={handleFilterClick}
                >
                  <IconFilter />
                  filter
                </button>
              </div>

              <h1 className='mb-4 text-lg font-bold'>Recommendation</h1>
              {loading && (
                <div className='flex h-screen items-center justify-center'>
                  <div className='h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500'></div>
                </div>
              )}
              {error && <p className='text-red-500'>{error}</p>}
              {!loading && !error && destinations.length > 0 && (
                <div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 min-[1300px]:grid-cols-4 min-[1700px]:grid-cols-5'>
                  {destinations.map(destination => (
                    <CustomCard
                      key={destination.id}
                      title={destination.name}
                      img={destination.imageLink}
                      rating={parseFloat(destination.rating)}
                      location={destination.regency}
                      description={`${destination.information.slice(0, 70)}...`}
                      clickToDetail={() => handleCardClick(destination.id)}
                      onKeyPress={e => handleKeyPress(e, destination.id)}
                      isSaveAvailable={true}
                      handleToggleSave={() => handleToggleSave(destination.id)}
                      isSaved={savedDestinations.includes(destination.id)}
                    />
                  ))}
                </div>
              )}
              {filterSubmitted && destinations.length === 0 && (
                <p className='text-center text-gray-500'>
                  No destinations found
                </p>
              )}
            </div>
          </div>
        </div>
        <Filter
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          handleFilterSubmit={handleFilterSubmit}
          handleFilterReset={handleFilterReset}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          destinationTypeFilter={destinationTypeFilter}
          setDestinationTypeFilter={setDestinationTypeFilter}
        />
      </div>
    </>
  )
}

export default withAuth(DashboardContent)
