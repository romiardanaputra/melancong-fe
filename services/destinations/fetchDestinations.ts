import api from '@/utils/api/axios'

export const fetchDestinations = async (
  searchQuery: string = '',
  location: string = '',
  destinationType: string = ''
) => {
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

  const response = await api.get(apiUrl)
  return response.data.data
}
