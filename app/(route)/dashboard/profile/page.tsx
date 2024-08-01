import Profile from '@/components/pages/dashboard/Profile'
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
