import { Metadata } from 'next'

import EmailVerificationForm from '@/app/(auth)/forgot-password/email-verification/components/EmailVerificationForm'

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
