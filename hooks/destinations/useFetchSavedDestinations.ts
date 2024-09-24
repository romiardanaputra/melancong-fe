import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { fetchSavedDestinations as fetchSavedDestinationService } from '@/services/destinations/fetchSavedDestinations'
import { ErrorResponse } from '@/dto/errorResponseDto'

const useFetchSavedDestinations = () => {
  const [savedDestinations, setSavedDestinations] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const fetchSavedDestinations = useCallback(async () => {
    try {
      const data = await fetchSavedDestinationService()
      setSavedDestinations(data)
    } catch (err) {
      const errorRes = err as ErrorResponse
      if (errorRes?.response?.status === 401) {
        router.push('/login')
      } else {
        setError('An unexpected error occurred')
      }
    }
  }, [router])
  useEffect(() => {
    fetchSavedDestinations()
  }, [fetchSavedDestinations])
  return {
    savedDestinations,
    setSavedDestinations,
    fetchSavedDestinations,
    error
  }
}

export default useFetchSavedDestinations
