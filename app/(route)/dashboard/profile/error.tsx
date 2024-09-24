'use client'

import { NextPage } from 'next'
import { ErrorProfileTypes } from './index.props'

const ProfileError: NextPage<ErrorProfileTypes> = ({ message }) => {
  return (
    <div className='mx-auto size-full min-h-dvh rounded-lg bg-white p-5'>
      {message}
    </div>
  )
}

export default ProfileError
