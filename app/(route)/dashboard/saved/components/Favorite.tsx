'use client'

import api from '@/utils/api/axios'
import withAuth from '@/app/withAuth'
import CustomCard from '@/components/ui/card/CustomCard'
import { IconSearch } from '@tabler/icons-react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { DestinationSavedTypes, ErrorResponseSavedTypes } from '../index.props'

const Favorite: NextPage = () => {
  const [destinations, setDestinations] = useState<DestinationSavedTypes[]>([])
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const fetchDestinations = useCallback(
    async (query: string = '') => {
      setLoading(true)
      let apiUrl = '/destinations/saved'
      if (query) {
        apiUrl += `?d=${query}`
      }

      try {
        const response = await api.get(apiUrl)
        setDestinations(response.data.data)
        setLoading(false)
        setError('')
      } catch (err) {
        const errorRes = err as ErrorResponseSavedTypes
        if (errorRes.response.status === 401) {
          // Unauthorized access, redirect to login
          router.push('/login')
        } else {
          setError('An unexpected error occurred')
        }
      }
    },
    [setLoading, setDestinations, setError, router]
  )

  useEffect(() => {
    fetchDestinations()
  }, [fetchDestinations])

  // save to localStorage
  useEffect(() => {
    const savedDestinations = destinations.map(dest => dest.id)
    localStorage.setItem(
      'saved-destinations',
      JSON.stringify(savedDestinations)
    )
  }, [destinations])

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    fetchDestinations(searchQuery)
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete('/destinations/delete', { data: { id } })
      setDestinations(prevDestinations => {
        const updated = prevDestinations.filter(dest => dest.id !== id)
        localStorage.setItem(
          'saved-destinations',
          JSON.stringify(updated.map(dest => dest.id))
        )
        return updated
      })
    } catch (err) {
      setError('An unexpected error occurred')
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
  return (
    <>
      <div className='w-full bg-white p-5 font-sans text-black md:p-10 md:pl-36 md:pr-16'>
        <form
          onSubmit={handleSearch}
          className='mb-5 flex items-center justify-between'
        >
          <div className='flex flex-1 items-center rounded-full bg-gray-100 p-2 text-black'>
            <IconSearch className='mr-2' />
            <input
              type='text'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Search'
              className='flex-1 border-none bg-transparent text-lg outline-none'
            />
          </div>
          <div className='ml-2 cursor-pointer rounded-full bg-gray-200 p-2'></div>
        </form>
        <h1 className='py-6 text-xl font-bold'>Saved Places</h1>
        {loading && (
          <div className='flex h-screen items-center justify-center'>
            <div className='h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500'></div>
          </div>
        )}
        {error && <p className='text-red-500'>{error}</p>}
        {destinations.length === 0 && (
          <p className='text-center text-gray-500'>No destinations found</p>
        )}
        <div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4 min-[1700px]:grid-cols-5'>
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
              handleDelete={() => handleDelete(destination.id)}
              isSavedRemove={true}
              isSaved={true}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default withAuth(Favorite)
