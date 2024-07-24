/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/app/api/axios'

interface Destination {
  id: string
  name: string
  rating: string
  regency: string
  imageLink: string
  information: string
}

interface ErrorResponse {
  response: {
    status: number
  }
}

const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [savedDestinations, setSavedDestinations] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
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
      setLoading(false)
      setError('')
    } catch (err) {
      const errorRes = err as ErrorResponse
      if (errorRes.response.status === 401) {
        router.push('/login')
      } else {
        setError('An unexpected error occurred')
      }
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

  return {
    destinations,
    savedDestinations,
    error,
    loading,
    fetchDestinations,
    handleSave,
    handleDelete,
    handleToggleSave
  }
}

export default useDestinations
