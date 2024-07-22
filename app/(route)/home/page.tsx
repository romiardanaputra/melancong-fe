'use client'
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiFilter } from 'react-icons/fi'
import api from '@/app/api'
import withAuth from '@/app/withAuth'
import { FaStar, FaArrowLeft } from 'react-icons/fa6'

interface Destination {
  id: string
  name: string
  rating: string
  regency: string
  imageLink: string
}

interface ErrorResponse {
  response: {
    status: number
  }
}

const Home: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [savedDestinations, setSavedDestinations] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [locationFilter, setLocationFilter] = useState<string>('')
  const [destinationTypeFilter, setDestinationTypeFilter] = useState<string>('')
  const router = useRouter()

  const fetchDestinations = async (
    searchQuery: string = '',
    location: string = '',
    destinationType: string = ''
  ) => {
    setLoading(true)
    let apiUrl = '/destinations'
    const params = new URLSearchParams()

    if (searchQuery) {
      params.append('d', searchQuery)
    }
    if (location) {
      params.append('r', location)
    }
    if (destinationType) {
      params.append('c', destinationType)
    }

    if (params.toString()) {
      apiUrl += `?${params.toString()}`
    }

    try {
      const response = await api.get(apiUrl)
      setDestinations(response.data.data)
      setError('')
    } catch (err) {
      const errorRes = err as ErrorResponse
      if (errorRes.response.status === 401) {
        router.push('/login')
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchSavedDestinations = async () => {
    try {
      const response = await api.get('/destinations/saved')
      setSavedDestinations(
        response.data.data.map((dest: Destination) => dest.id)
      )
    } catch (err) {
      const errorRes = err as ErrorResponse
      if (errorRes.response.status === 401) {
        router.push('/login')
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  useEffect(() => {
    fetchDestinations()
    fetchSavedDestinations()
  }, [])

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    fetchDestinations(searchQuery, locationFilter, destinationTypeFilter)
  }

  const handleSave = async (id: string) => {
    try {
      await api.post('/destinations/add', { id })
      setSavedDestinations(prevSaved => [...prevSaved, id])
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete('/destinations/delete', { data: { id } })
      setSavedDestinations(prevSaved =>
        prevSaved.filter(savedId => savedId !== id)
      )
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  const handleToggleSave = (id: string) => {
    if (savedDestinations.includes(id)) {
      handleDelete(id)
    } else {
      handleSave(id)
    }
  }

  const handleCardClick = (id: string) => {
    router.push(`/destinations/${id}`)
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    if (event.key === 'Enter') {
      handleCardClick(id)
    }
  }

  const handleFilterSubmit = () => {
    fetchDestinations(searchQuery, locationFilter, destinationTypeFilter)
    setIsSidebarOpen(false)
  }

  const handleFilterReset = () => {
    setLocationFilter('')
    setDestinationTypeFilter('')
    fetchDestinations(searchQuery)
    setIsSidebarOpen(false)
  }

  return (
    <div className='bg-gray-200 p-5'>
      <form
        className='mb-5 flex items-center justify-between'
        onSubmit={handleSearch}
      >
        <div className='flex flex-1 items-center rounded-full bg-gray-100 p-2'>
          <FiSearch className='mr-2' />
          <input
            type='text'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='Search'
            className='flex-1 bg-transparent outline-none'
          />
        </div>
        <button
          className='ml-2 cursor-pointer rounded-full bg-gray-100 p-2 transition duration-300 ease-in-out hover:bg-blue-100 active:bg-blue-200'
          onClick={() => setIsSidebarOpen(true)}
          aria-label='Open Sidebar'
        >
          <FiFilter />
        </button>
      </form>
      <h1 className='text-lg font-bold'>Recommendation</h1>
      {loading && (
        <div className='flex h-screen items-center justify-center'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500'></div>
        </div>
      )}
      {error && <p className='text-red-500'>{error}</p>}
      {!loading && destinations.length === 0 && (
        <p className='text-center text-gray-500'>No destinations found</p>
      )}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 xl:grid-cols-4'>
        {destinations.map(destination => (
          <div
            key={destination.id}
            className='relative transform cursor-pointer rounded-lg bg-white shadow transition-transform hover:scale-105 focus:scale-105'
            onClick={() => handleCardClick(destination.id)}
            onKeyPress={event => handleKeyPress(event, destination.id)}
            role='button'
            tabIndex={0}
          >
            <button
              type='button'
              onClick={e => {
                e.stopPropagation()
                handleToggleSave(destination.id)
              }}
              className={`absolute right-2 top-2 z-10 rounded-full p-1 text-2xl ${savedDestinations.includes(destination.id) ? 'bg-yellow-400' : 'bg-white/80'}`}
            >
              <FaStar />
            </button>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/melanc0ng.appspot.com/o/image%2F3.jpg?alt=media&token=4b1bc0e1-5261-4c7d-a8a3-22a509fa5e09'
              alt={destination.name}
              className='w-full rounded-t-lg'
            />
            <div className='p-5 text-left'>
              <h2 className='text-lg font-bold'>{destination.name}</h2>
              <p>&#9733; {destination.rating}</p>
              <p>Bali, {destination.regency}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role='dialog'
        aria-labelledby='sidebar-title'
        aria-modal='true'
      >
        <div className='p-5'>
          <div className='flex items-center space-x-2'>
            <button
              className='flex items-center text-gray-500 hover:text-gray-700'
              onClick={() => setIsSidebarOpen(false)}
              aria-label='Close Sidebar'
            >
              <FaArrowLeft className='text-xl' />
            </button>
            <h2 className='text-xl font-bold'>Filter</h2>
          </div>

          <div className='pt-5'>
            <h3 className='mb-2 text-lg font-semibold'>Locations</h3>
            <div className='flex flex-wrap gap-2'>
              {[
                'Tabanan',
                'Badung',
                'Gianyar',
                'Denpasar',
                'Karangasem',
                'Buleleng',
                'Klungkung',
                'Bangli',
                'Jembrana'
              ].map(location => (
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
              {[
                'Historical Landmark',
                'Beach',
                'Temple',
                'Wildlife',
                'Museum',
                'Garden',
                'Lake',
                'Waterfall',
                'Mountain',
                'Hot Spring',
                'Rice Field',
                'Culture',
                'Hill',
                'Countryside'
              ].map(destination => (
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
            <img src='/logo.png' alt='Melancong' className='w-32' />
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
    </div>
  )
}

export default withAuth(Home)
