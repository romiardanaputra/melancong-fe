'use client'

import { NextPage } from 'next'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SubmitButton from '@/components/ui/button/SubmitButton'
import FieldComponent from '@/components/ui/form/Field'
import api from '@/app/api/axios'
import ErrorResponse from '@/app/api/error'

interface Props {}

const LoginPage: NextPage<Props> = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      const data = response.data

      if (response.status === 200) {
        localStorage.setItem('token', data.data.token)
        router.push('/home')
      } else {
        setError(data.message)
      }
    } catch (err) {
      const errorResponse = err as ErrorResponse
      if (errorResponse.response?.data?.message) {
        setError(errorResponse.response.data.message)
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  return (
    <>
      <div className=''>
        <div className='space-y-2 py-12'>
          <span className='text-sm font-medium text-gray-400'>-login page</span>
          <h1 className='text-3xl font-bold'>Welcome Back User</h1>
          <p className='font-medium'>Login Into Your Account</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <FieldComponent
              fieldType='email'
              fieldName='email'
              fieldId='email'
              fieldRequired={true}
              labelFor='email'
              fieldMessage='example correct email: johndoe@example.com'
              fieldPlaceholder=' '
              labelText='Email Address'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <FieldComponent
              fieldType='password'
              fieldName='password'
              fieldId='password'
              fieldRequired={true}
              labelFor='password'
              fieldMessage='we recommend you to use 1 capital letter, 1 number and 1 special character'
              fieldPlaceholder=' '
              labelText='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <p className='text-red-500'>{error}</p>}
            <div>
              <div className='flex justify-end py-4 text-sm font-medium text-cyan-500'>
                <Link href='/forgot-password/email-verification'>
                  Forget Password
                </Link>
              </div>
              <SubmitButton btnText='Login Now' />
            </div>
          </form>

          <div className='flex justify-center py-2 lg:py-4'>
            <span className='text-sm'>Don&apos;t have account?</span>
            <Link
              href='/sign-up'
              className='ml-1 text-sm font-medium text-cyan-500'
            >
              register here
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
