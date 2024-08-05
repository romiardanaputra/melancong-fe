import Profile from '@/pages/dashboard/Profile/Profile'
import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
  title: 'Profile'
}

const ProfilePage: NextPage = () => {
  return (
    <>
      <Profile />
    </>
  )
}

export default ProfilePage
