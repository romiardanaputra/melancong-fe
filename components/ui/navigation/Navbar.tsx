import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Props {}

const Navbar: NextPage<Props> = () => {
  return (
    <>
      <nav className='fixed w-full border-gray-200 bg-transparent dark:bg-gray-900'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <Link
            href='https://flowbite.com/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <Image
              src='https://flowbite.com/docs/images/logo.svg'
              className='h-8'
              alt='Flowbite Logo'
            />
            <span className='self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white'>
              Flowbite
            </span>
          </Link>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='h-5 w-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-transparent p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse'>
              <li>
                <a
                  href='#'
                  className='block rounded px-3 py-2 text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Explore more
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
