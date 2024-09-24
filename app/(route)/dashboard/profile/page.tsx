import { Metadata } from 'next'

import Profile from '@/app/(route)/dashboard/profile/components/ProfileContent'

export const metadata: Metadata = {
  title: 'Profile'
}

const ProfilePage = () => {
  return (
    <>
      <Profile />
    </>
  )
}

export default ProfilePage
