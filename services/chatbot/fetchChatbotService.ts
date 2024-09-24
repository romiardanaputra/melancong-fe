import api from '@/utils/api/axios'

export const fetchChatbotService = async (prompt: string) => {
  const response = await api.post('/chatbot', { prompt })
  if (response.status !== 200) {
    throw new Error('Error in fetching response')
  }
  return response.data.message
}
