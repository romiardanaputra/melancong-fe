import Link from 'next/link'

import { motion } from 'framer-motion'

const Logo = () => {
  return (
    <>
      <Link
        href='#'
        aria-label='melancong small logo'
        className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'
      >
        <div className='h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-cyan-800 dark:bg-white' />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='whitespace-pre font-medium text-black dark:text-white'
        >
          Melancong
        </motion.span>
      </Link>
    </>
  )
}

export default Logo
