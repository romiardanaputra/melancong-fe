import { Metadata } from 'next'

import SignUpForm from '@/pages/auth/SignUpForm'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Melancong - Sign Up'
}

const SignUpPage = () => {
  return (
    <>
      <SignUpForm />
    </>
  )
}

export default SignUpPage
