import { DestinationDto } from '@/dto/destinationsDto'
import api from '@/utils/api/axios'

export const fetchSavedDestinations = async (): Promise<string[]> => {
  const response = await api.get('/destinations/saved')
  return response.data.data.map((dest: DestinationDto) => dest.id)
}
