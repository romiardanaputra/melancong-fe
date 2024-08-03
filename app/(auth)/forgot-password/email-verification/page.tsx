import { Metadata, NextPage } from 'next'
import EmailVerificationForm from '@/pages/auth/forgot-password/EmailVerificationForm'

interface Props {}

export const metadata: Metadata = {
  title: 'Email Confirmation',
  description: 'Melancong - Email Confirmation'
}

const EmailConfirmation: NextPage<Props> = () => {
  return (
    <>
      <EmailVerificationForm />
    </>
  )
}

export default EmailConfirmation
