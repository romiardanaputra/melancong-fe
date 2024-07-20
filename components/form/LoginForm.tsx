/* eslint-disable no-console */
'use client'
// import { authenticate } from '@/lib/actions'
import { Form } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import CustomField from '../CustomField'
import { FormFieldType } from './SignUpForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserLoginValidation } from '@/lib/validation'
import SubmitButton from '../SubmitButton'
import Link from 'next/link'

export default function LoginForm(): React.ReactNode {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof UserLoginValidation>>({
    resolver: zodResolver(UserLoginValidation),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const handleLoginSubmit = (values: z.infer<typeof UserLoginValidation>) => {
    console.log({ values })
    try {
      // do action for login here

      // after success login go to dashboard
      setIsLoading(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLoginSubmit)}
        className='space-y-5'
        autoComplete='off'
        // action={authenticate}
      >
        <CustomField
          name='email'
          control={form.control}
          fieldType={FormFieldType.INPUT}
          type='email'
          label='Email'
        />
        <CustomField
          name='password'
          control={form.control}
          fieldType={FormFieldType.INPUT}
          type='password'
          label='Password'
        />

        <div>
          <Link
            href='/auth/forgot-password'
            className='text-sm font-medium text-blue-800'
          >
            forgot password?
          </Link>
        </div>

        <div className='absolute bottom-0 left-0 flex w-full flex-col gap-4 p-8 text-center'>
          <SubmitButton
            isLoading={isLoading}
            className='mt-4 w-full font-bold uppercase'
          >
            sign in
          </SubmitButton>
          <Link
            href='/auth/register'
            className='text-sm font-medium text-blue-800'
          >
            Don&apos;t have an account? register
          </Link>
        </div>
      </form>
    </Form>
  )
}
