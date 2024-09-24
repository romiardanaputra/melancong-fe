import { Metadata } from 'next'

import Favorite from '@/app/(route)/dashboard/saved/components/Favorite'

export const metadata: Metadata = {
  title: 'Favorite'
}

const SavedPage = () => {
  return (
    <>
      <Favorite />
    </>
  )
}

export default SavedPage
