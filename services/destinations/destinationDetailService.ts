// services/destinationService.ts
import {
  DestinationDetail,
  ErrorResponseDetail
} from '@/app/(route)/destinations/index.props'
import api from '@/utils/api/axios'

export const fetchDestinationDetail = async (
  id: string
): Promise<DestinationDetail> => {
  try {
    const response = await api.get(`/destinations/detail/${id}`)
    return response.data.data
  } catch (err) {
    const errorRes = err as ErrorResponseDetail
    if (errorRes.response.status === 401) {
      throw new Error('Unauthorized')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
