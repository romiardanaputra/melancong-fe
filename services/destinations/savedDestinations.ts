import api from '@/utils/api/axios'

export const saveDestination = async (id: string) => {
  await api.post('/destinations/add', { id })
}
