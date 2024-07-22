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

const Home: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [savedDestinations, setSavedDestinations] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const fetchDestinations = async (query: string = '') => {
    setLoading(true)
    let apiUrl = '/destinations'
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
    fetchDestinations(searchQuery)
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
        <div className='ml-2 cursor-pointer rounded-full bg-gray-100 p-2'>
          <FiFilter />
        </div>
      </form>
      <h1 className='text-lg font-bold'>Recomendation</h1>
      {loading && (
        <div className='flex h-screen items-center justify-center'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-gray-200'></div>
        </div>
      )}
      {error && <p className='text-red-500'>{error}</p>}
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
    </div>
  )
}

export default withAuth(Home)
