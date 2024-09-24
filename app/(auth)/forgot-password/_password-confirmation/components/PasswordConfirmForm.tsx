import SubmitButton from '@/components/ui/button/SubmitButton'
import FieldComponent from '@/components/ui/form/Field'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const PasswordConfirmForm: NextPage<Props> = () => {
  return (
    <>
      <div>
        <div className='space-y-2 py-12'>
          <span className='text-sm font-medium text-gray-400'>
            -Forgot Password Page
          </span>
          <h1 className='text-3xl font-bold'>Recover Your Password</h1>
          <p className='font-medium'>Horray! now you can create new password</p>
        </div>
        <div>
          <form action='' className='space-y-6'>
            <FieldComponent
              fieldType='password'
              fieldName='password'
              fieldId='password'
              fieldRequired={true}
              labelFor='password'
              fieldMessage='we recommend you to use 1 capital letter, 1 number and 1 special character'
              fieldPlaceholder=' '
              labelText='Set New Password'
              // value={email}
              // onChange={e => setEmail(e.target.value)}
            />
            <FieldComponent
              fieldType='password_confirmation'
              fieldName='password_confirmation'
              fieldId='password_confirmation'
              fieldRequired={true}
              labelFor='password_confirmation'
              fieldMessage='confirm your password'
              fieldPlaceholder=' '
              labelText='Confirm Your Password'
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

export default PasswordConfirmForm
