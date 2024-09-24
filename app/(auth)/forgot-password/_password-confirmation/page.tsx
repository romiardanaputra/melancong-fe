import { Metadata } from 'next'

import PasswordConfirmForm from '@/app/(auth)/forgot-password/_password-confirmation/components/PasswordConfirmForm'

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
