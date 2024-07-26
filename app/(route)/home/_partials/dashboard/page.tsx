/* eslint-disable prefer-template */
import useDestinations, { Destination } from '@/app/hooks/useDestinations'
import CustomCard from '@/components/ui/card/CustomCard'
import { NextPage } from 'next'
import React, { FormEvent } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { PlaceholdersAndVanishInput } from '@/components/ui/input/placeholders-and-vanish-input'
import { placeholders } from '@/data'

interface Props {
  destinations: Destination[]
  searchQuery: string
  handleSearch: (query: string) => void
  filterSubmitted: boolean
}

const DashboardUser: NextPage<Props> = ({
  destinations,
  searchQuery,
  handleSearch,
  filterSubmitted
}) => {
  const { savedDestinations, error, loading, handleToggleSave } =
    useDestinations()

  const router = useRouter()

  const handleCardClick = (id: string) => {
    router.push(`/destinations/${id}`)
  }

  const onSearch = (event: FormEvent) => {
    event.preventDefault()
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    e.preventDefault()
    handleSearch(searchQuery)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <>
      <div className='flex flex-1'>
        <div className='flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 md:p-10'>
          <form
            className='mb-5 flex items-center justify-between'
            onSubmit={onSearch}
          >
            <div className='flex flex-1 items-center rounded-full bg-gray-100 p-2'>
              <FiSearch className='mr-2' />
              <input
                type='text'
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder='Search'
                className='flex-1 bg-transparent outline-none'
              />
            </div>
          </form>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
          <h1 className='text-lg font-bold'>Recommendation</h1>
          {loading && (
            <div className='flex h-screen items-center justify-center'>
              <div className='h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500'></div>
            </div>
          )}
          {error && <p className='text-red-500'>{error}</p>}
          {!loading && !error && destinations.length > 0 && (
            <div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
              {destinations.map(destination => (
                <CustomCard
                  key={destination.id}
                  title={destination.name}
                  img={destination.imageLink}
                  rating={destination.rating}
                  location={destination.regency}
                  description={destination.information.slice(0, 70) + '...'}
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
            <p className='text-center text-gray-500'>No destinations found</p>
          )}
        </div>
      </div>
    </>
  )
}

export default DashboardUser
