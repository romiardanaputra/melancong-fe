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
      <div className='flex items-center justify-center gap-4 pt-4 md:mt-4 md:flex-col md:items-start md:justify-normal lg:mt-0 lg:flex-row lg:items-center'>
        <div className='ml-4 flex flex-col md:ml-0 md:items-center lg:items-start'>
          <div className='mb-4 flex items-center gap-4 md:flex-col lg:flex-row'>
            <div className='rounded-full bg-cyan-800 p-4'>{icon}</div>
            <h2 className='mb-2 text-xl font-bold text-neutral-800 md:text-2xl'>
              {title}
            </h2>
          </div>

          <p className='w-full text-pretty text-sm leading-relaxed text-neutral-600 md:w-[90%] lg:w-full'>
            {description}
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutList
