import Link from 'next/link'

const LogoIcon = () => {
  return (
    <>
      <Link
        href='#'
        aria-label='melancong small logo'
        className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
      >
        <div className='h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-cyan-800 dark:bg-white' />
      </Link>
    </>
  )
}

export default LogoIcon
