import { Metadata } from 'next'

import LoginForm from '@/pages/auth/LoginForm'

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
