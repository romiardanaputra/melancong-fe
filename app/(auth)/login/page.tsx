import SubmitButton from '@/components/button/SubmitButton'
import FieldComponent from '@/components/form/Field'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const LoginPage: NextPage<Props> = () => {
  return (
    <>
      <div className=''>
        <div className='space-y-2 py-12'>
          <span className='text-sm font-medium text-gray-400'>-login page</span>
          <h1 className='text-3xl font-bold'>Welcome Back User</h1>
          <p className='font-medium'>Login Into Your Account</p>
        </div>
        <div>
          <form action='' className='space-y-6'>
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

            <SubmitButton btnText='Login Now' />
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
