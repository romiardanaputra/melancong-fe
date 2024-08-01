import ProfileEdit from '@/components/pages/dashboard/ProfileEdit'
import { NextPage } from 'next'

export const metadata = {
  title: 'Edit Profile'
}

const EditProfilePage: NextPage = () => {
  return (
    <>
      <ProfileEdit />
    </>
  )
}

export default EditProfilePage
