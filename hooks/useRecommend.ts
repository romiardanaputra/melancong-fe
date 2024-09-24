/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import api from '@/utils/api/axios'

export interface Destination {
  id: string
  name: string
  rating: string
  regency: string
  imageLink: string
  information: string
}

const useRecommend = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const fetchRecommendation = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await api.get('/destinations')
      setDestinations(response.data.data)
      setLoading(false)
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  useEffect(() => {
    fetchRecommendation()
  }, [])

  return {
    destinations,
    error,
    loading,
    fetchRecommendation
  }
}

export default useRecommend
