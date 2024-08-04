import { Metadata } from 'next'

import EmailVerificationForm from '@/pages/auth/forgot-password/EmailVerificationForm'

export const metadata: Metadata = {
  title: 'Email Confirmation',
  description: 'Melancong - Email Confirmation'
}

const EmailConfirmation = () => {
  return (
    <>
      <EmailVerificationForm />
    </>
  )
}

export default EmailConfirmation
