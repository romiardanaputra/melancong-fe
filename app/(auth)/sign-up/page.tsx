import { Metadata } from 'next'

import SignUpForm from '@/app/(auth)/sign-up/components/SignUpForm'

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
