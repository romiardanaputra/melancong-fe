'use client'

import api from '@/utils/api/axios'
import SubmitButton from '@/components/ui/button/SubmitButton'
import FieldComponent from '@/components/ui/form/Field'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import Swal from 'sweetalert2'
import ErrorResponse from '@/utils/api/error'
import { IconEyeOff, IconEye } from '@tabler/icons-react'

interface Props {}

const SignUpForm: NextPage<Props> = () => {
  const [name, setFullname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (password !== passwordConfirmation) {
      Swal.fire({
        icon: 'error',
        html: 'Passwords do not match',
        confirmButtonColor: '#00838F'
      })
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
        Swal.fire({
          icon: 'success',
          html: 'Registration Successfully, please check your email for a link to verify your account',
          confirmButtonColor: '#00838F',
          iconColor: '#00838F'
        }).then(result => {
          if (result.isConfirmed) {
            router.push('/login')
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          html: `${data.message}`,
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
      <div className=''>
        <div className='space-y-2 py-12'>
          <span className='text-sm font-medium text-gray-600'>
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

            <div className='relative'>
              <FieldComponent
                fieldType={showPassword ? 'text' : 'password'}
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

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/4 -translate-y-1/2 transform text-gray-600 md:top-1/3'
              >
                {showPassword ? (
                  <IconEyeOff stroke={2} />
                ) : (
                  <IconEye stroke={2} />
                )}
              </button>
            </div>

            <div className='relative'>
              <FieldComponent
                fieldType={showPassword ? 'text' : 'password'}
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
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/4 -translate-y-1/2 transform text-gray-600 md:top-1/3'
              >
                {showPassword ? (
                  <IconEyeOff stroke={2} />
                ) : (
                  <IconEye stroke={2} />
                )}
              </button>
            </div>

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

export default SignUpForm
