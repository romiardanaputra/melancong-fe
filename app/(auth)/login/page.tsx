import LoginForm from '@/pages/auth/LoginForm'
import { Metadata, NextPage } from 'next'

interface Props {}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Melancong - Login'
}

const LoginPage: NextPage<Props> = () => {
  return (
    <>
      <LoginForm />
    </>
  )
}

export default LoginPage
