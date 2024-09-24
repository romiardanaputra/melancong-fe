import { NextPage } from 'next'
import { destinationLocations, destinationTypes } from '@/data'
import Image from 'next/image'
import { IconArrowLeft } from '@tabler/icons-react'

interface Props {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  locationFilter: string
  setLocationFilter: (location: string) => void
  destinationTypeFilter: string
  setDestinationTypeFilter: (type: string) => void
  handleFilterSubmit: () => void
  handleFilterReset: () => void
}

const SideBar: NextPage<Props> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  locationFilter,
  setLocationFilter,
  destinationTypeFilter,
  setDestinationTypeFilter,
  handleFilterSubmit,
  handleFilterReset
}) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role='dialog'
        aria-labelledby='sidebar-title'
        aria-label='sidebar'
        aria-modal='true'
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
            <h3 className='mb-2 text-lg font-semibold'>Locations</h3>
            <div className='flex flex-wrap gap-2'>
              {destinationLocations.map(location => (
                <button
                  key={location}
                  onClick={() => setLocationFilter(location)}
                  className={`rounded-full px-3 py-1 ${locationFilter === location ? 'bg-blue-200' : 'bg-gray-200'}`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
          <br />
          <div className='w-full'>
            <hr className='rounded-sm border-t-4 border-gray-500' />
          </div>

          <div className='mt-4'>
            <h3 className='mb-2 text-lg font-semibold'>Destinations</h3>
            <div className='flex flex-wrap gap-2'>
              {destinationTypes.map(destination => (
                <button
                  key={destination}
                  onClick={() => setDestinationTypeFilter(destination)}
                  className={`rounded-full px-3 py-1 ${destinationTypeFilter === destination ? 'bg-blue-200' : 'bg-gray-200'}`}
                >
                  {destination}
                </button>
              ))}
            </div>
          </div>

          <br />
          <div className='w-full'>
            <hr className='rounded-sm border-t-4 border-gray-500' />
          </div>

          <div className='mt-6 flex justify-between'>
            <button
              className='rounded-full bg-black px-4 py-2 text-white'
              onClick={handleFilterSubmit}
            >
              Submit
            </button>
            <button
              className='rounded-full border border-black px-4 py-2'
              onClick={handleFilterReset}
            >
              Reset
            </button>
          </div>
          <div className='mt-6 flex justify-center'>
            <Image src='/logo.png' alt='Melancong' className='w-32' />
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

export default SideBar
