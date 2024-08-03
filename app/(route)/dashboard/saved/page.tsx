import { Metadata, NextPage } from 'next'
import Favorite from '@/pages/dashboard/Favorite'

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
