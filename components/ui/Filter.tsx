'use client'

import { destinationLocations, destinationTypes } from '@/data'
import { IconArrowLeft } from '@tabler/icons-react'
import { NextPage } from 'next'
import Logo from '@/components/ui/logo/Logo'

interface Props {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  handleFilterSubmit: () => void
  handleFilterReset: () => void
  locationFilter: string
  setLocationFilter: (location: string) => void
  destinationTypeFilter: string
  setDestinationTypeFilter: (type: string) => void
}

const Filter: NextPage<Props> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  handleFilterSubmit,
  handleFilterReset,
  locationFilter,
  setLocationFilter,
  destinationTypeFilter,
  setDestinationTypeFilter
}) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 transform overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role='dialog'
        aria-labelledby='sidebar-title'
        aria-modal='true'
        aria-label='sidebar'
      >
        <div className='p-5'>
          <div className='flex items-center space-x-2'>
            <button
              className='flex items-center text-gray-500 hover:text-gray-700'
              onClick={() => setIsSidebarOpen(false)}
              aria-label='Close Sidebar'
            >
              <IconArrowLeft className='text-xl' />
            </button>
            <h2 className='text-xl font-bold'>Filter</h2>
          </div>

          <div className='pt-5'>
            <h3 className='py-4 text-lg font-semibold text-neutral-800'>
              Locations
            </h3>
            <div className='flex flex-wrap gap-2.5 text-sm'>
              {destinationLocations.map(location => (
                <button
                  key={location}
                  onClick={() => setLocationFilter(location)}
                  className={`rounded-full px-3 py-1 tracking-wide will-change-transform ${locationFilter === location ? 'transform bg-cyan-800 text-white transition-all' : 'bg-gray-200 text-neutral-900'}`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
          <br />
          <div className='w-full'>
            <hr className='rounded-sm border border-zinc-300' />
          </div>

          <div className='mt-4'>
            <h3 className='mb-2 py-4 text-lg font-semibold'>Destinations</h3>
            <div className='flex flex-wrap gap-2.5 text-sm'>
              {destinationTypes.map(destination => (
                <button
                  key={destination}
                  onClick={() => setDestinationTypeFilter(destination)}
                  className={`rounded-full px-3 py-1 text-neutral-800 will-change-transform ${destinationTypeFilter === destination ? 'transform bg-cyan-800 text-white transition-all' : 'bg-gray-200 text-neutral-900'}`}
                >
                  {destination}
                </button>
              ))}
            </div>
          </div>

          <br />
          <div className='w-full'>
            <hr className='rounded-sm border border-zinc-300' />
          </div>

          <div className='mt-6 flex justify-between'>
            <button
              className='rounded-full bg-cyan-800 px-8 py-2 text-white'
              onClick={handleFilterSubmit}
            >
              Submit
            </button>
            <button
              className='rounded-full border border-black px-8 py-2'
              onClick={handleFilterReset}
            >
              Reset
            </button>
          </div>
          <div className='flex justify-center py-10'>
            <Logo
              width={150}
              height={100}
              className='aspect-square h-20 w-32'
            />
          </div>
        </div>
      </div>
      {/* Overlay */}
      {isSidebarOpen && (
        <button
          className='fixed inset-0 z-40 bg-black bg-opacity-50'
          onClick={() => setIsSidebarOpen(false)}
          aria-label='Close Sidebar'
        ></button>
      )}
    </>
  )
}

export default Filter
