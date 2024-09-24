/* eslint-disable no-undef */
import { NextPage } from 'next'

interface Props {
  chidlren?: React.ReactNode
  btnText: string
}

const SubmitButton: NextPage<Props> = ({ btnText }) => {
  return (
    <>
      <div className='w-full'>
        <button className='group relative mb-2 me-2 mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800'>
          <span className='relative w-full rounded-full bg-white px-5 py-3 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            {btnText}
          </span>
        </button>
      </div>
    </>
  )
}

export default SubmitButton
