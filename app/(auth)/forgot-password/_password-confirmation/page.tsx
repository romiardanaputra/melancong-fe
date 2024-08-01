import PasswordConfirmForm from '@/components/pages/auth/forgot-password/PasswordConfirmForm'
import { Metadata, NextPage } from 'next'

interface Props {}

export const metadata: Metadata = {
  title: 'Password Confirmation',
  description: 'Melancong - Password Confirmation'
}

const PasswordConfirmation: NextPage<Props> = () => {
  return (
    <>
      <PasswordConfirmForm />
    </>
  )
}

export default PasswordConfirmation
