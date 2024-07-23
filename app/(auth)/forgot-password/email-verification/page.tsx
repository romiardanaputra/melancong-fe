'use client'

import { useState, FormEvent } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import SubmitButton from '@/components/button/SubmitButton'
import FieldComponent from '@/components/form/Field'
import api from '@/app/api/axios'
import ErrorResponse from '@/app/api/error'

interface Props {}

const EmailConfirmation: NextPage<Props> = () => {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    try {
      const response = await api.post('/auth/forgot-password', { email })

      if (response.status === 200) {
        setSuccess('A password reset link has been sent to your email address.')
      } else {
        setError('Failed to send verification email.')
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
      <div>
        <div className='space-y-2 py-12'>
          <span className='text-sm font-medium text-gray-400'>
            -Forgot Password Page
          </span>
          <h1 className='text-3xl font-bold'>Forgot Your Password?</h1>
          <p className='font-medium'>Please Confirm Your Email First</p>
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
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}
            <SubmitButton btnText='Submit' />
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

export default EmailConfirmation
