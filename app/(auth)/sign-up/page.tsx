'use client'

import { NextPage } from 'next'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FieldComponent from '@/components/form/Field'
import SubmitButton from '@/components/button/SubmitButton'
import api from '@/app/api/axios'
import ErrorResponse from '@/app/api/error'

interface Props {}

const SignUpPage: NextPage<Props> = () => {
  const [name, setFullname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (password !== passwordConfirmation) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      })

      const data = response.data

      if (response.status === 201) {
        router.push('/login')
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
          <span className='text-sm font-medium text-gray-400'>
            -registration page
          </span>
          <h1 className='text-3xl font-bold'>Welcome New User</h1>
          <p className='font-medium'>Let&apos;s create your account</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <FieldComponent
              fieldType='text'
              fieldName='fullname'
              fieldId='fullname'
              fieldRequired={true}
              labelFor='fullname'
              fieldMessage='example fullname: Kadek Romi Ardana Putra'
              fieldPlaceholder=' '
              labelText='Full Name'
              value={name}
              onChange={e => setFullname(e.target.value)}
            />

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

            <FieldComponent
              fieldType='password'
              fieldName='password_confirmation'
              fieldId='password_confirmation'
              fieldRequired={true}
              labelFor='password_confirmation'
              fieldMessage='we recommend you to use 1 capital letter, 1 number and 1 special character'
              fieldPlaceholder=' '
              labelText='Password Confirmation'
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
            />

            {error && <p className='text-red-500'>{error}</p>}
            <SubmitButton btnText='Register Now' />
          </form>
          <div className='flex justify-center py-4'>
            <span className='text-sm'>already have an account?</span>
            <Link
              href='/login'
              className='ml-1 text-sm font-medium text-cyan-500'
            >
              Login{' '}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
