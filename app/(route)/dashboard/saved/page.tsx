import { Metadata, NextPage } from 'next'
import Favorite from '@/components/pages/dashboard/Favorite'

export const metadata: Metadata = {
  title: 'Favorite'
}

const Saved: NextPage = () => {
  return (
    <>
      <Favorite />
    </>
  )
}

export default Saved
