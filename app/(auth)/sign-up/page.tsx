import { Metadata, NextPage } from 'next'
import SignUpForm from '@/components/pages/auth/SignUpForm'

interface Props {}
export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Melancong - Sign Up'
}

const SignUpPage: NextPage<Props> = () => {
  return (
    <>
      <SignUpForm />
    </>
  )
}

export default SignUpPage
