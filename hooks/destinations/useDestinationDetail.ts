// hooks/useDestinationDetail.ts
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  DestinationDetail,
  ErrorResponseDetail
} from '@/app/(route)/destinations/index.props'
import { fetchDestinationDetail } from '@/services/destinations/destinationDetailService'

export const useDestinationDetail = (id: string) => {
  const [destination, setDestination] = useState<DestinationDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const getDestinationDetail = async () => {
      setLoading(true)
      try {
        const data = await fetchDestinationDetail(id)
        setDestination(data)
        setError('')
      } catch (err) {
        const errRes = err as ErrorResponseDetail
        if (errRes.response?.status === 401) {
          router.push('/login')
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      getDestinationDetail()
    }
  }, [id, router])

  return { destination, loading, error }
}
