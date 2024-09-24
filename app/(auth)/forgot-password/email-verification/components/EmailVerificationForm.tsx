'use client'

import api from '@/utils/api/axios'
import ErrorResponse from '@/utils/api/error'
import SubmitButton from '@/components/ui/button/SubmitButton'
import FieldComponent from '@/components/ui/form/Field'
import { NextPage } from 'next'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import Swal from 'sweetalert2'

interface Props {}

const EmailVerificationForm: NextPage<Props> = () => {
  const [email, setEmail] = useState<string>('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await api.post('/auth/forgot-password', { email })

      if (response.status === 200) {
        Swal.fire({
          icon: 'info',
          html: 'A password reset link has been sent to<br> your email address.',
          confirmButtonColor: '#00838F',
          iconColor: '#00838F'
        })
      } else {
        Swal.fire({
          icon: 'error',
          html: 'Failed to send verification email.',
          confirmButtonColor: '#00838F'
        })
      }
    } catch (err) {
      const errorResponse = err as ErrorResponse
      if (errorResponse.response?.data?.message) {
        Swal.fire({
          icon: 'error',
          html: `${errorResponse.response.data.message}`,
          confirmButtonColor: '#00838F'
        })
      } else {
        Swal.fire({
          icon: 'error',
          html: 'An unexpected error occurred',
          confirmButtonColor: '#00838F'
        })
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

export default EmailVerificationForm
