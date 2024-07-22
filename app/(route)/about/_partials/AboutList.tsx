/* eslint-disable no-undef */
import { NextPage } from 'next'

interface Props {
  icon: React.ReactNode
  title: string
  description: string
}

const AboutList: NextPage<Props> = ({ icon, title, description }) => {
  return (
    <>
      <div className='flex items-center justify-center gap-4 pt-4 md:flex-col md:items-start lg:flex-row lg:items-center'>
        {/* icon */}
        <div className='relative ml-3 flex items-center justify-center pr-6 md:pb-4 lg:pb-0'>
          <div className='absolute -z-10 size-14 rounded-full bg-neutral-900 p-3 md:-left-4 md:-top-4'></div>
          {icon}
        </div>

        <div className='flex flex-col'>
          <h2 className='text-xl font-bold text-neutral-800 md:text-2xl'>
            {title}
          </h2>
          <p className='w-full text-sm text-neutral-600 md:w-[90%] lg:w-full'>
            {description}
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutList
