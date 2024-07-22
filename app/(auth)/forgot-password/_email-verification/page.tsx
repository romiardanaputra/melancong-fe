import SubmitButton from '@/components/button/SubmitButton'
import FieldComponent from '@/components/form/Field'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const EmailConfirmation: NextPage<Props> = () => {
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
              // value={email}
              // onChange={e => setEmail(e.target.value)}
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

export default EmailConfirmation
