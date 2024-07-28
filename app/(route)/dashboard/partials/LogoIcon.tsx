import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const LogoIcon: NextPage<Props> = () => {
  return (
    <>
      <Link
        href='#'
        className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
      >
        <div className='h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white' />
      </Link>
    </>
  )
}

export default LogoIcon
