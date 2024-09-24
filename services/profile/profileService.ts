import { UserProfileTypes } from '@/app/(route)/dashboard/profile/index.props'
import api from '@/utils/api/axios'

export const fetchUserProfile = async () => {
  const response = await api.get('/users/profile')
  return response.data.data
}

export const updateUserProfile = async (
  editField: Partial<UserProfileTypes>
) => {
  await api.put('/users/update', editField)
}

export const uploadProfileImage = async (formData: FormData) => {
  await api.post('/users/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
