import { NextPage } from 'next'
import Image from 'next/image'

import BalineseDance from '@/public/assets/images/balinese-dance.webp'
import Logo from '@/components/ui/logo/Logo'
import { AuthProps } from './index.props'

const AuthLayout: NextPage<AuthProps> = ({ children }) => {
  return (
    <>
      <div className='min-h-screen overflow-hidden'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='relative hidden h-full min-h-screen lg:block'>
            <Image
              src={BalineseDance}
              alt='balinese dance'
              className='aspect-square size-full object-cover'
              priority={true}
              quality={50}
            />
            <div className='absolute inset-0 bg-black opacity-20'></div>
          </div>
          {/* auth page */}
          <div className='container max-w-screen-sm py-8 lg:max-w-screen-sm'>
            <div className='flex justify-center lg:justify-end'>
              <Logo width={100} height={100} className='aspect-auto' />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
