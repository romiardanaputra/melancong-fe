import api from '@/utils/api/axios'

export const deleteDestination = async (id: string) => {
  await api.delete('/destinations/delete', { data: { id } })
}
