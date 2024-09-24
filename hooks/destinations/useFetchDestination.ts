import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import api from '@/utils/api/axios'
import { DestinationDto } from '@/dto/destinationsDto'
import { fetchDestinations as fetchDestinationService } from '@/services/destinations/fetchDestinations'

const useFetchDestination = () => {
  const [destinations, setDestinations] = useState<DestinationDto[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await api.get('/auth/token-validation')
        if (!response.data.valid) {
          localStorage.removeItem('token')
          Swal.fire({
            title: 'Login Required',
            text: 'You must login to continue.',
            icon: 'info',
            confirmButtonColor: '#00838F'
          }).then(result => {
            if (result.isConfirmed) {
              router.push('/login')
            }
          })
          return false
        }
        return true
      } catch (err) {
        localStorage.removeItem('token')
        return false
      }
    }
  }, [router])

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
    const execute = async () => {
      const isTokenValid = await validateToken()
      if (isTokenValid) {
        fetchDestinations()
      }
    }
    execute()
  }, [validateToken])

  return {
    destinations,
    fetchDestinations,
    loading,
    error
  }
}

export default useFetchDestination
