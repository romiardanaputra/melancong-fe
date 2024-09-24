import { Metadata } from 'next'

import LoginForm from '@/app/(auth)/login/components/LoginForm'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Melancong - Login'
}

const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  )
}

export default LoginPage
