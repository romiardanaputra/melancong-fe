/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
'use client'
import React, { useState } from 'react'
// zod import
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import form component
import { Form } from '@/components/ui/form'
import CustomField from '@/components/CustomField'
import SubmitButton from '../SubmitButton'
import Link from 'next/link'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/user.actions'

// create enum
export enum FormFieldType {
  INPUT = 'input',
  PHONE_INPUT = 'phoneInput',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

export default function SignUpForm(): React.ReactNode {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // this where the zod useForm hooks and it will get any changes from the formschema
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  // init the handle submit
  const handleSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true)
    try {
      const userRegisterData = {
        fullName: values.fullName,
        email: values.email,
        password: values.password
      }
      const user = await createUser(userRegisterData)
      if (user) {
        router.push('/user/auth/signIn')
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
        <CustomField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='fullName'
          label='Full Name'
        />

        <CustomField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='email'
          label='Email Address'
          type='email'
        />
        <CustomField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='password'
          label='Password'
          type='password'
        />
        <CustomField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='confirmPassword'
          label='Confirm Password'
          type='password'
        />

        <p className='text-sm'>
          By continuing, you agree to our{' '}
          <Link href='#' className='text-blue-700'>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href='#' className='text-blue-700'>
            Privacy Policy
          </Link>
        </p>
        {/* <CustomField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name='phone'
          label='Phone Number'
        /> */}
        <div className='absolute bottom-0 left-0 flex w-full flex-col gap-4 p-8 text-center'>
          <SubmitButton isLoading={isLoading} className='mt-4 w-full font-bold'>
            Sign Up
          </SubmitButton>
          <Link href='#' className='text-sm font-medium text-blue-800'>
            Use phone number instead
          </Link>
        </div>
      </form>
    </Form>
  )
}
