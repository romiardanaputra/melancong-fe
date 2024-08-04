import { Metadata } from 'next'

import PasswordConfirmForm from '@/pages/auth/forgot-password/PasswordConfirmForm'

export const metadata: Metadata = {
  title: 'Password Confirmation',
  description: 'Melancong - Password Confirmation'
}

const PasswordConfirmation = () => {
  return (
    <>
      <PasswordConfirmForm />
    </>
  )
}

export default PasswordConfirmation
