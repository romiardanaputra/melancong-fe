import { DestinationDto } from '@/dto/destinationsDto'
import { useEffect, useState } from 'react'
import { fetchDestinations as fetchDestinationService } from '@/services/destinations/fetchDestinations'

const useFetchDestination = () => {
  const [destinations, setDestinations] = useState<DestinationDto[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const fetchDestinations = async (
    searchQuery: string = '',
    location: string = '',
    destinationType: string = ''
  ) => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchDestinationService(
        searchQuery,
        location,
        destinationType
      )
      setDestinations(data)
      setLoading(false)
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  useEffect(() => {
    fetchDestinations()
  }, [])
  return {
    destinations,
    fetchDestinations,
    loading,
    error
  }
}

export default useFetchDestination
