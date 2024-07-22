import { NextPage } from 'next'
import FieldComponent from '@/components/form/Field'
import SubmitButton from '@/components/button/SubmitButton'
import Link from 'next/link'

interface Props {}

const SignUpPage: NextPage<Props> = () => {
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
          <form action='' className='space-y-6'>
            <FieldComponent
              fieldType='text'
              fieldName='fullname'
              fieldId='fullname'
              fieldRequired={true}
              labelFor='fullname'
              fieldMessage='example fullname: Kadek Romi Ardana Putra'
              fieldPlaceholder=' '
              labelText='Full Name'
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
            />
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
