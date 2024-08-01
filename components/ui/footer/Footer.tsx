import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const Footer: NextPage<Props> = () => {
  return (
    <>
      <div className='pt-20'>
        <footer className='bg-cyan-800 text-neutral-100 dark:bg-gray-900'>
          <div className='mx-auto w-full max-w-screen-xl p-4 md:py-8'>
            <span className='block text-center text-sm text-neutral-100'>
              © 2024{' '}
              <Link href='#' className='hover:underline'>
                Melancong
              </Link>
              . All Rights Reserved. - Images by pexels.com and google.com
            </span>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer
