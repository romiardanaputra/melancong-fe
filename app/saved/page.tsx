'use client'
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiFilter } from 'react-icons/fi'
import api from '../api'
import withAuth from '../withAuth'
import { FaStar } from 'react-icons/fa6'

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

const Saved: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const fetchDestinations = async (query: string = '') => {
    setLoading(true)
    let apiUrl = '/destinations/saved'
    if (query) {
      apiUrl += `?d=${query}`
    }

    try {
      const response = await api.get(apiUrl)
      setDestinations(response.data.data)
      setError('')
    } catch (err) {
      const errorRes = err as ErrorResponse
      if (errorRes.response.status === 401) {
        // Unauthorized access, redirect to login
        router.push('/login')
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDestinations()
  }, [])

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    fetchDestinations(searchQuery)
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete('/destinations/delete', { data: { id } })
      setDestinations(prevDestinations =>
        prevDestinations.filter(dest => dest.id !== id)
      )
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
    <div className='bg-gray-200 p-5 font-sans text-black md:p-10'>
      <form
        onSubmit={handleSearch}
        className='mb-5 flex items-center justify-between'
      >
        <div className='flex flex-1 items-center rounded-full bg-gray-100 p-2 text-black'>
          <FiSearch className='mr-2' />
          <input
            type='text'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='Search'
            className='flex-1 border-none bg-transparent text-lg outline-none'
          />
        </div>
        <div className='ml-2 cursor-pointer rounded-full bg-gray-200 p-2'>
          <FiFilter />
        </div>
      </form>
      <h1 className='text-xl font-bold'>Saved Places</h1>
      {loading && (
        <div className='flex h-screen items-center justify-center'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-blue-500 border-gray-200'></div>
        </div>
      )}
      {error && <p className='text-red-500'>{error}</p>}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 xl:grid-cols-4'>
        {destinations.map(destination => (
          <div
            key={destination.id}
            onClick={() => handleCardClick(destination.id)}
            onKeyPress={event => handleKeyPress(event, destination.id)}
            role='button'
            tabIndex={0}
            className='relative cursor-pointer rounded-lg bg-white shadow-lg transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none'
          >
            <button
              type='button'
              onClick={e => {
                e.stopPropagation()
                handleDelete(destination.id)
              }}
              className='absolute right-2 top-2 z-10 cursor-pointer rounded-full border-none bg-white bg-opacity-80 p-2 text-xl'
            >
              <FaStar />
            </button>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/melanc0ng.appspot.com/o/image%2F3.jpg?alt=media&token=4b1bc0e1-5261-4c7d-a8a3-22a509fa5e09'
              alt={destination.name}
              className='w-full rounded-t-lg'
            />
            <div className='p-5 text-left text-black'>
              <h2 className='text-xl font-bold'>{destination.name}</h2>
              <p>&#9733;{destination.rating}</p>
              <p>Bali, {destination.regency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withAuth(Saved)
