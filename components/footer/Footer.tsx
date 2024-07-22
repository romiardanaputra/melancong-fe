import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const Footer: NextPage<Props> = () => {
  return (
    <>
      <footer className='bg-neutral-900 text-neutral-100 dark:bg-gray-900'>
        <div className='mx-auto w-full max-w-screen-xl p-4 md:py-8'>
          <span className='block text-sm text-neutral-100 sm:text-center'>
            © 2024{' '}
            <Link href='#' className='hover:underline'>
              Melancong
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  )
}

export default Footer
